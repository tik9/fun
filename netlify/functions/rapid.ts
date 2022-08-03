
import dotenv from "dotenv";
import { Handler } from "@netlify/functions";

dotenv.config()

const handler: Handler = async (event, context) => {
    var host, url
    //@ts-ignore
    var eventbody = JSON.parse(event.body)
    if (eventbody.type == 'joke') {
        host = 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
        url = 'https://' + host + '/jokes/search?query=abc'
    }
    else {
        host = 'alpha-vantage.p.rapidapi.com'
        url = 'https://' + host + '/query?function=TIME_SERIES_MONTHLy&symbol=' + eventbody.input + '&datatype=json&output_size=compact'
    }

    try {
        var res = await (await fetch(url, {
            //@ts-ignore
            headers:
            {
                'x-rapidapi-key': process.env.rapidapi,
                'x-rapidapi-host': host
            }
        })).json()

        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }
    } catch (err) {
        return {
            statusCode: 404,
            body: err.toString(),
        };
    }
};

export { handler };