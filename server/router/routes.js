import {Router} from "express";
import * as controller from '../controllers/appController.js'

const router = Router();


/*POST Method*/
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(); // send the mail
router.route('/authenticate').post((req, res) => res.end()); //authenticate user
router.route('/login').post(controller.login); // login in app


/*GET Method*/
router.route('/user/:username').get(controller.getUser); // user with username
router.route('/generateOTP').get(controller.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP); // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

/*PUT Method*/
router.route('/updateuser').put(controller.updateUser); // update the user profile
router.route('/resetPassword').put(controller.resetPassword); // used to rest password

export default router