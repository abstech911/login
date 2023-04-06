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

export const register = async (req, res) =>{
    res.json('register route')
}


/**
 * POST http://localhost:8080/api/login
 * @param :{
 *     "username" : "value",
 *     "password" : "value",
 * }
 * */
export const login = async (req,res)=>{
    res.json('login route')
}


/**
 * GET http://localhost:8080/api/user/username
 * */
export const getUser =(req,res)=>{
    res.json('getUser route')
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
export const updateUser =(req,res)=>{
    res.json('updateUser route')
}


/**
 * GET http://localhost:8080/api/generateOTP
 * */
export const generateOTP =(req,res)=>{
    res.json('generateOTP route')
}

/**
 * GET http://localhost:8080/api/verifyOTP
 * */
export const verifyOTP =(req,res)=>{
    res.json('verifyOTP route')
}


/**
 * successfully redirect user when OTP is valid
 * GET http://localhost:8080/api/createResetSession
 * */
export const createResetSession = (req,res)=>{
    res.json('create Reset Session')
}

/**
 * GET http://localhost:8080/api/resetpassword
 * */
export const resetPassword = (req,res)=>{
    res.json('Reset Password Session')
}