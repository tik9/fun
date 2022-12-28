
import fetch from 'node-fetch';
import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {

    var url = 'https://google-translate1.p.rapidapi.com/language/translate/v2'
    let method = 'post'
    let body

    if (typeof (event.queryStringParameters!.input) != 'undefined') {
        url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search?query=' + event.queryStringParameters!.input
        method = 'get'
    }
    else {
        let jsbody = JSON.parse(event.body!)

        body = { target: "de", q: jsbody.q }
    }
    const options = {
        method: method,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': process.env.rapid!
        },
        body: JSON.stringify(body)
    };

    console.log({ options })

    var res
    try { res = await (await fetch(url, options)).json() } catch (error) { console.log(1, error) }
    return { statusCode: 200, body: JSON.stringify(res) }
}
