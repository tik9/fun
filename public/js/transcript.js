
var audio = "https://bit.ly/3yxKEIY"
var url = 'https://api.assemblyai.com/v2/transcript'

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// out()
async function out() {
    console.log(await transcript())
}

async function transcript() {
    var auth = await (await fetch('/.netlify/functions/utils')).json()

    var id = (await (await fetch(url,
        {
            method: 'post',
            headers: { authorization: auth },
            body: JSON.stringify({ audio_url: audio })
        })).json()).id
    console.log(2, id)
    // await sleep(9000)
    res = await (await fetch(url + '/' + id, {
        headers: { authorization: auth },
    }
    )).json()
    return res.status
}

const getTranscript = async () => {
    var auth = await (await fetch('/.netlify/functions/utils')).json()
    var id = (await (await fetch(url,
        {
            method: 'post',
            headers: { authorization: auth },
            body: JSON.stringify({ audio_url: audio })
        })).json()).id
    console.log(1, id)
    // Interval for checking transcript completion
    const checkCompletionInterval = setInterval(async () => {
        const transcript = await (await fetch(url + '/' + id, {
            headers: { authorization: auth },
        })).json()
        const transcriptStatus = transcript.status

        if (transcriptStatus !== "completed") {
            console.log(`Transcript Status: ${transcriptStatus}`)
        } else if (transcriptStatus === "completed") {
            console.log("\nTranscription completed!\n")
            let transcriptText = transcript.text
            console.log(`Your transcribed text:\n\n${transcriptText}`)
            clearInterval(checkCompletionInterval)
        }
    }, 5000)
}

getTranscript()