
import mailgun from 'mailgun-js';

const mailg = mailgun({ apiKey: process.env.mailgun, domain: 'sandbox155be01191ff49929c48ce437f0feb28.mailgun.org' });

export async function handler(event) {
    var from, msg
    var params = event.queryStringParameters
    if (Object.keys(params).length != 0) {
        from = 'tom<a@b.c>'
        msg = 1
    }
    else {
        var body = JSON.parse(event.body)
        from = body.name + ' <' + body.email + '>'
        msg = body.message
    }
    try {
        var res = await mailg.messages().send({
            from: from,
            to: 'timo@tik1.net',
            subject: "my website",
            text: msg
        })

    } catch (error) { console.log(1, error) }

    return {
        statusCode: 200,
        body: JSON.stringify(res)
    }
}