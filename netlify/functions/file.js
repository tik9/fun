
import { promises as fs } from "fs"
import path from 'path'

export async function handler(event, context) {
    try {

        var res = JSON.parse(await fs.readFile(path.join('json', 'cloud.json')))
        const { json } = event.queryStringParameters;
        // console.log(1, res)
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }

    } catch (error) { console.log(error) }
}


export function writeJs(file, json) { try { fs.writeFile(file, JSON.stringify(json, null, 2)); } catch (error) { console.log(error) } }