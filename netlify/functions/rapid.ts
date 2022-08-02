
import dotenv from "dotenv";
import { Handler } from "@netlify/functions";

dotenv.config()

var host = 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
var url = 'https://' + host + '/jokes/search?query=abc'

const handler: Handler = async (event, context) => {
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
};

export { handler };
