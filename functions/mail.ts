
import { Context } from '@netlify/functions'

const nodemailer = require('nodemailer');

export default async (req: Request, context: Context) => {

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

    transport.sendMail(mailOptions, (error:any, info:any) => {
        if (error) {
            return false;
        } else {
            console.log('Message sent: ' + info.response);
            return true;
        };
    });
}