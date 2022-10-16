
import axios from 'axios';
import { Handler } from '@netlify/functions';
import qs from 'qs';

export const handler: Handler = async (event) => {

    var url = 'https://google-translate1.p.rapidapi.com/language/translate/v2'
    var method = 'post'
    var input, body

    if (typeof (event.queryStringParameters!.input) != 'undefined') {
        input = event.queryStringParameters!.input
        url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search'
        method = 'get'
    }
    else {
        body = {
            target: "de",
            q: JSON.parse(event.body!).q
        }
    }
    const options = {
        method: method,
        url: url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': process.env.rapid!
        },
        params: { query: input },
        data: qs.stringify(body)
    };
    var res
    try {
        res = (await axios.request(options)).data
    } catch (error) { console.log(1, error) }

    return { statusCode: 200, body: JSON.stringify(res) }
}
