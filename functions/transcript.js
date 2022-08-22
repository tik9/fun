
import dotenv from "dotenv";
import fetch from 'node-fetch';

var url = 'https://api.assemblyai.com/v2/transcript'
var audio = "https://bit.ly/3yxKEIY"

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

dotenv.config()
const handler = async (event, context) => {
    var id = await api1()
    await sleep(9000)
    var res = await api2(id)
    console.log(res)
    return { body: res, statusCode: 200 }
}

async function api1() {
    var res = await (await fetch(url, {
        method: 'post',
        headers: { authorization: process.env.assemblyapi },
        body: JSON.stringify({ audio_url: audio })
    })).json()
    return res.id
}


async function api2(id) {
    var res = await (await fetch(url + '/' + id, {
        headers: {
            "content-type": "application/json",
            authorization: process.env.assemblyapi
        },
    })).json()
    return res.text
}

export { handler, url, audio }