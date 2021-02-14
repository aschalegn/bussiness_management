import { EventEmitter } from "events";
import nodemailer from "nodemailer";
const emailEmiter = new EventEmitter();
import { gmail, gmailPassword } from "./config";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: gmail,
        pass: gmailPassword
    }
});

emailEmiter.on("forgotPassword", (email) => {
    const mailOption = {
        to: email,
        from: "aschaley1@gmail.com",
        subject: "forgot password",
        // text: "hgcfvbhj m",
        html:
            `<div>
                <head>
                    Hi ${email}
                    <h1>Forgot password</ h1 >
                </head>
                <body>
                    reset your password from this link "google.com" </br>
                    if you did't ask to reset password please ignore the massage
                </body>
            </div>
            `
    }

    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err);
        }
        if (info) {
            console.log(info);
        }
    })
});



export { emailEmiter };