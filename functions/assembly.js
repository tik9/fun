
import dotenv from "dotenv";
import fetch from 'node-fetch';
import { url, audio } from "./as2"

dotenv.config()
const handler = async (event, context) => {
    const refreshInterval = 4000

    var res = await (await fetch(url, {
        method: 'post',
        headers: { authorization: process.env.assemblyapi, },
        body: JSON.stringify({ audio_url: audio })
    })).json()
    const checkCompletionInterval = setInterval(async () => {
        var transcript = await (await fetch(url + '/' + res.id, {
            headers: { authorization: process.env.assemblyapi },
        })).json()

        if (transcript.status !== "completed") {
            console.log(`Transcript Status: ${transcript.status}`)
        } else if (transcript.status === "completed") {
            console.log(`transcribed text:\n${transcript.text}`)
            clearInterval(checkCompletionInterval)
            return { body: transcript.text }
        }
    }, refreshInterval)
    return { 1: 1, statusCode: 200 }
}

export { handler }