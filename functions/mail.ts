
import { Handler } from '@netlify/functions'

const nodemailer = require('nodemailer');

export const handler: Handler = async (event) => {

    const mailadr = 'user153015@gmail.com'

    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        //secure: true,
        //port: 465,
        auth: {
            user: mailadr,
            pass: process.env.mail
        }
    })

    let mailOptions = {
        from: mailadr,
        to: mailadr,
        subject: 'Test email',
        text: 'this is some text',
        html: '<b>Hello world </b>'
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false;
        } else {
            console.log('Message sent: ' + info.response);
            return true;
        };
    });

}