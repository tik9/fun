
import { Handler } from "@netlify/functions"

require('dotenv/config')

var url = 'https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_mONTHLy&symbol=ibm&datatype=json&output_size=compact'
url = 'https://country-flags.p.rapidapi.com/svg/ad'
url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages'
url = 'https://numbersapi.p.rapidapi.com/2/math?fragment=true&json=true'

//@ts-ignore
var handler: Handler = async (event, context) => {
    // console.log(event)
    // return { body: JSON.stringify(event), statusCode: 200 }

    try {
        var res = await (await fetch(url, {
            //@ts-ignore
            headers:
            {
                'x-rapidapi-key': process.env.rapidapi,
                'x-rapidapi-host': url.split('//')[1]
            }
        })).json()
        // console.log(res)
        return { statusCode: 200, body: JSON.stringify(res) }
    } catch (err) {
        return {
            statusCode: 404,
            body: console.log('err here', err),
        };
    }
}


export { handler }