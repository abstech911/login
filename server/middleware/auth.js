import jwt from "jsonwebtoken";
import ENV from '../config.js'
export const Auth = async (req, res, next) => {
    try{
    //    access authorize header ro validate request
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
        req.user = decodedToken;
        next();
    }catch (e) {
        res.status(401).json({error : "Authentication Failed"})
    }
}

//Middle ware for local variables

export const localVariables =(req, res, next)=>{
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
next();
}