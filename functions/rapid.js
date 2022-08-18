
import dotenv from "dotenv";
import fetch from 'node-fetch';

dotenv.config()

export const handler = async (event, context) => {
    var eventbody = (event.body == '{}') ? { type: 'btnjoke', input: 'abc' } : JSON.parse(event.body)
    var url
    if (eventbody.type == 'btnjoke') url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search?query=' + eventbody.input
    else url = 'https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_MONTHLy&symbol=' + eventbody.input + '&datatype=json&output_size=compact'

    try {
        var res = await (await fetch(url, {
            headers:
            {
                'x-rapidapi-key': process.env.rapidapi,
                'x-rapidapi-host': url.split('//')[1]
            }
        })).json()
        // console.log(1, res.result[0])

        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }
    } catch (err) {
        return {
            statusCode: 404,
            body: console.log('error here', err)
        };
    }
};