
import fetch from 'node-fetch';

var url = 'https://api.assemblyai.com/v2/transcript'
var audio = "https://bit.ly/3yxKEIY"

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

export const handler = async (event) => {
    var id = await api1()
    await sleep(9000)
    var res = await api2(id)
    // await sleep(3000)

    console.log(1, res)
    return { body: res, statusCode: 200 }
}

async function api1() {
    return (await (await fetch(url, {
        method: 'post',
        headers: { authorization: process.env.assembly },
        body: JSON.stringify({ audio_url: audio })
    })).json()).id
}


async function api2(id) {
    return (await (await fetch(url + '/' + id, {
        headers: { authorization: process.env.assembly }
    })).json()).text
}