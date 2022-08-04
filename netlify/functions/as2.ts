
import dotenv from "dotenv";
import { Handler } from "@netlify/functions";

var url = 'https://api.assemblyai.com/v2/transcript'
var audio = "https://bit.ly/3yxKEIY"

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

dotenv.config()
//@ts-ignore
const handler: Handler = async (event, context) => {
    var id = await api1()
    await sleep(9000)
    var res = await api2(id)
    console.log(res)
    return { body: res, statusCode: 200 }
}

async function api1() {
    var res = await (await fetch(url, {
        method: 'post',
        //@ts-ignore
        headers: { authorization: process.env.assemblyapi },
        body: JSON.stringify({ audio_url: audio })
    })).json()
    return res.id
}


async function api2(id) {
    // id = 'od0j13zsu4-1895-493a-a4ff-0b516a6ee34f'

    var res = await (await fetch(url + '/' + id, {
        //@ts-ignore
        headers: {
            "content-type": "application/json",
            authorization: process.env.assemblyapi
        },
    })).json()
    return res.text
}

export { handler, url, audio }