
import axios from "axios";

var url = 'https://api.assemblyai.com/v2/transcript'
var audio = "https://bit.ly/3yxKEIY"

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

export const handler = async (event) => {
    var id = await api1()
    await sleep(8000)
    var res = await api2(id)

    // console.log(2, res)
    return { body: JSON.stringify(res), statusCode: 200 }
}

async function api1() {
    return (await axios.request({
        url: url,
        method: 'post',
        headers: { authorization: process.env.assembly },
        data: JSON.stringify({ audio_url: audio })
    })).data.id
}


async function api2(id) {
    return (await axios.request({
        url: url + '/' + id,
        headers: { authorization: process.env.assembly }
    })).data
}