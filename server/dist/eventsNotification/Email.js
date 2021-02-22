"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailEmiter = void 0;
var events_1 = require("events");
var nodemailer_1 = __importDefault(require("nodemailer"));
var emailEmiter = new events_1.EventEmitter();
exports.emailEmiter = emailEmiter;
var config_1 = require("./config");
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: config_1.gmail,
        pass: config_1.gmailPassword
    }
});
emailEmiter.on("forgotPassword", function (email) {
    var mailOption = {
        to: email,
        from: "aschaley1@gmail.com",
        subject: "forgot password",
        // text: "hgcfvbhj m",
        html: "<div>\n                <head>\n                    Hi " + email + "\n                    <h1>Forgot password</ h1 >\n                </head>\n                <body>\n                    reset your password from this link \"google.com\" </br>\n                    if you did't ask to reset password please ignore the massage\n                </body>\n            </div>\n            "
    };
    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.log(err);
        }
        if (info) {
            console.log(info);
        }
    });
});
