import UserModel from "../model/user.model.js";
import userModel from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SECRET from '../config.js';
import otpGenerator from 'otp-generator';

export const verifyUser = async (req, res, next) => {
    console.log('Verify user ')
    try {
        const {username} = req.method === "GET" ? req.query : req.body;
        // check the user existence
        let exist = await UserModel.findOne({username});
        if (!exist) res.status(404).send({error: 'Cannot find user here'});
        next();
    } catch (e) {
        res.status(404).send({error: "Authentication Error"})
    }
}

/**
 * POST http://localhost:8080/api/register
 * @param :{
 *     "username" : "value",
 *     "password" : "value",
 *     "email" : "value",
 *     "firstname" : "value",
 *     "lastname" : "value",
 *     "mobile" : "value",
 *     "address" : "value",
 *     "profile" : "value",
 * }
 * */
export const register = async (req, res) => {
    console.log('trying to rgeister')
    try {
        const {username, password, profile, email} = req.body;

        /*Check if the username already exist*/
        const existUsername = new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findOne({username});
                if (user) {
                    reject({error: "Please use unique username "})
                }
                resolve();
            } catch (e) {
                reject({error: e})
            }
        });


        /*Check if the email already exist*/
        const existEmail = new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findOne({email});
                if (user) {
                    reject({error: "Please use unique email "})
                }
                resolve();
            } catch (e) {
                reject({error: e})
            }
        });


        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedpassword => {
                            const user = new UserModel({
                                username,
                                password: hashedpassword,
                                profile: profile || '',
                                email,
                            });
                            //
                            user.save()
                                .then(result => res.status(200).send({
                                    msg: 'user registration sucessful',
                                    user: result
                                }))
                                .catch(error => res.status(500).send({error: 'Failed registration '}))
                        })
                        .catch(error => res.status(500).send({error: `unable to has password ${error}`}))
                }
            })
            .catch(error => res.status(500).send({error: `unable to has password ${error.error}`}))

    } catch (e) {
        return res.status(500).send({error: e, location: 'first try block in register(existEmail) '})
    }
}


/**
 * POST http://localhost:8080/api/login
 * @param :{
 *     "username" : "value",
 *     "password" : "value",
 * }
 * */
export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        userModel.findOne({username})
            .then((user) => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) return res.status(400).send({error: "Don't have password"})

                        //    create json web token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, SECRET.JWT_SECRET, {expiresIn: "24h"})

                        return res.status(200).send({msg: "Login successful", username: user.username, token})
                    })
                    .catch(error => res.status(401).send({error: "Invalid Login detail"}))
            })
            .catch(error => res.status(404).send({error: "Username not found"}));

        res.status(200).send({user})
    } catch (error) {

    }
}


/**
 * GET http://localhost:8080/api/user/username
 * */
export const getUser = (req, res) => {
    const {username} = req.params;
    try {
        if (!username) return res.status(501).send({error: "Invalid username"});
        userModel.findOne({username})
            .then((user) => {
                if (!user) res.status(501).send({error: "Could not find the user"});

                const {password, ...rest} = Object.assign({}, user.toJSON())
                return res.status(201).send(rest);

            })
            .catch((e) => res.status(404).send({error: `${e}`}))
    } catch (e) {
        return res.status(404).send({error: `Cannot find user ${e}`})
    }
}
/**
 * PUT http://localhost:8080/api/updateuser
 * @param :{
 *     "id" : "userid"
 * }
 * body :{
 *     firstname :'',
 *     address :'',
 *     profile :'',
 * }
 * */
export const updateUser = (req, res) => {
    try {
        // const id = req.query.id;
        const {userId} = req.user;
        if (userId) {
            const body = req.body;

            UserModel.updateOne({_id: userId}, body)
                .then((user) => res.status(201).send({msg: "Record Updated ", user, body}))
                .catch((error) => res.status(401).send({error: "Update Failed ..."}));

        } else return res.status(401).send({error: "User Not found ..."})

    } catch (e) {
        return res.status(401).send({e})
    }
}


/**
 * GET http://localhost:8080/api/generateOTP
 * @param :{
 *     "username" : "userid"
 * }
 * */
export const generateOTP = async (req, res) => {
    req.app.locals.OTP = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
    res.status(201).send({code: req.app.locals.OTP});
}

/**
 * GET http://localhost:8080/api/verifyOTP
 * */
export const verifyOTP = (req, res) => {
    const {code} = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;

        return res.status(201).send({msg: 'Verified Successfully'});
    }
    return res.status(400).send({msg: 'Invalid OTP'});
}


/**
 * successfully redirect user when OTP is valid
 * GET http://localhost:8080/api/createResetSession
 * */
export const createResetSession = (req, res) => {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false;
        return res.status(201).send({msg: "access granted"})
    }
    res.status(404).send({error: "Session expired"})
}

/**
 * GET http://localhost:8080/api/resetpassword
 * */
export const resetPassword = (req, res) => {


    try {
        if (!req.app.locals.resetSession) {
            return res.status(440).send({error: "Session expired"})
        }
        const {username, password} = req.body;
        try {
            UserModel.findOne({username})
                .then((user) => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({username: user.username}, {password: hashedPassword})
                                .then(user => {
                                    console.log(user)
                                    return res.status(201).send({msg: "Updated", user})
                                })
                                .catch(error => res.status(500).send({error: "Unable to hash password"}))
                        })
                        .catch(error => {
                            return res.status(500).send({error: "Unable to hash password"})
                        })
                })
                .catch(error => res.status(404).send({error: "Username not found"}))

        } catch (e) {
            res.status(500).send({error: "Unable to hash password"})
        }
    } catch (e) {
        res.status(500).send({error: "Unable to hash password"})
    }
}