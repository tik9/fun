
import axios from "axios";

var url = 'https://api.assemblyai.com/v2/transcript'
var audio = "https://bit.ly/3yxKEIY"

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

const getTranscript = async () => {
    var id = (await (await fetch(url,
        {
            method: 'post',
            headers: { authorization: process.env.assembly },
            body: JSON.stringify({ audio_url: audio })
        })).json()).id
    // console.log(1, id)
    // Interval for checking transcript completion
    const checkCompletionInterval = setInterval(async () => {
        const transcript = await (await fetch(url + '/' + id, {
            headers: { authorization: process.env.assembly },
        })).json()
        const transcriptStatus = transcript.status

        if (transcriptStatus !== "completed") {
            console.log(`Transcript Status: ${transcriptStatus}`)
        } else if (transcriptStatus === "completed") {
            console.log("\nTranscription completed!\n")
            let transcriptText = transcript.text
            console.log(`transcribed:\n\n${transcriptText}`)
            clearInterval(checkCompletionInterval)
            return transcriptStatus
        }
    }, 5000)
}

export const handler = async (event) => {
    var res = await getTranscript()
    return { body: JSON.stringify(res), statusCode: 200 }
}

// async function api1() {
//     return (await axios.request({
//         url: url,
//         method: 'post',
//         headers: { authorization: process.env.assembly },
//         data: JSON.stringify({ audio_url: audio })
//     })).data.id
// }


// async function api2(id) {
//     return (await axios.request({
//         url: url + '/' + id,
//         headers: { authorization: process.env.assembly }
//     })).data
// }