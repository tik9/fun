
import { Handler } from '@netlify/functions';
import mailgun from 'mailgun-js';

const mailg = mailgun({ apiKey: process.env.mailgun!, domain: 'sandbox155be01191ff49929c48ce437f0feb28.mailgun.org' });

export const handler: Handler = async (event) => {
    // from = 't<a@b.c>'
    // msg = 1
    var from: string, msg: string
    if (event.body) {
        var body = JSON.parse(event.body!)
        from = body.name + ' <' + body.email + '>'
        msg = body.message

        await mailg.messages().send({
            from: from,
            to: 'timo@tik1.net',
            subject: "website",
            text: msg
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify('from mg')
    }
}