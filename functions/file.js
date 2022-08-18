
import { promises as fs } from "fs"
import path from 'path'

export async function handler(event, context) {
    try {

        const { json } = event.queryStringParameters;
        var res = JSON.parse(await fs.readFile(path.resolve('json', json + '.json')))
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }

    } catch (error) { console.log(error) }
}

export function writeJs(file, json) { try { fs.writeFile(path.resolve('json', file + '.json'), JSON.stringify(json, null, 2)); } catch (error) { console.log(error) } }

export async function add_removeJs(file, data) {
    try {
        var json = JSON.parse((await fs.readFile(path.resolve('json', file + '.json'))).toString());
        json.push(data);
        // json.pop()
        await fs.writeFile(path.resolve('json', file + '.json'), JSON.stringify(json, null, 2));
    } catch (error) { console.log(1, error, file, data) }
};