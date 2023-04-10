import ENV from '../config.js';
import nodemailer from 'nodemailer';
import mailGen from 'mailgen';

//https://ethereal.email/create

let nodeConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD
    }
}

let transporter = nodemailer.createTransport(nodeConfig);
let mailGenerator = new mailGen({theme: "default", product: {name: "Mailgen", link: "https://mailgen.js/"}})


/**
 * POST http://localhost:8080/api/registerMail
 * @param :{
 *     "username" : "value",
 *     "userEmail" : "value",
 *     "text" : "value",
 *     "subject" : "value",
 * }
 * */
export const registerMail = async (req,res) =>{
    const {username, userEmail, text, subject} = req.body;
//    body of mail
    const email ={
        body : {name: username, intro:text || 'Welcome to my app',outro: 'Need help' }
    }

    const emailBody = mailGenerator.generate(email);

    let message ={
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Subject",
        html:emailBody,

    }

    //send mail
    transporter.sendMail(message)
        .then(()=>{
            return res.status(200).send({msg:"You should receive an email"})
        })
        .catch((error)=>res.status(500).send({error}))

}