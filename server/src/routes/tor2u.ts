import { Router, Request, Response } from "express";
const router = Router();
const nodemailer = require('nodemailer');

router.post('/api/forma', (req: Request, resopnse: Response) => {

    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'terayeteraye@gmail.com',
            pass: 'hhowjkjqrpuqsikt'
        }
    });


    let mailOptions = {
        from: data.email,
        to: 'terayeteraye@gmail.com',
        subject: `Message from ${data.fullName}`,

        html: `
      <h3>Information</h3>
      <ul>
      <li>Full-Name: ${data.fullName}</li>
      <li>Phone: ${data.phone}</li>
      <li>Email: ${data.email}</li>
      </ul>
      `
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (err: any, res:Response) {

        console.log(mailOptions);
        console.log(mailOptions.from);

        if (res) {
            console.log(res, 'res');
            console.log('-----------------------------------------------------');
            resopnse.json({
                message: res,
                status: 200
            })
        } else {
            console.log(err, 'Error');
        }
    })
    smtpTransport.close();

})

export default router;