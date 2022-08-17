
import dotenv from "dotenv";
dotenv.config()

export async function handler(event, context) {
    var { env } = event.queryStringParameters

    if (env == '') env = 'netlify'
    console.log(env)
    return { statusCode: 200, body: JSON.stringify(process.env[env].substring(0,4)) }
}