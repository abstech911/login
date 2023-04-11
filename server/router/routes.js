import {Router} from "express";
import * as controller from '../controllers/appController.js'
import {Auth, localVariables} from "../middleware/auth.js";
import {registerMail} from "../controllers/mailer.js";

const router = Router();


/*POST Method*/
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the mail
router.route('/authenticate').post(controller.verifyUser,(req, res) => res.end()); //authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app


/*GET Method*/
router.route('/user/:username').get(controller.getUser); // user with username
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP); // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

/*PUT Method*/
router.route('/updateuser').put(Auth,controller.updateUser); // update the user profile
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword); // used to rest password

export default router