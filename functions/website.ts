import { sortTable } from './utils'
import { find } from './mongo'
import { resolve } from 'path'
import { promises as fs } from "fs";

let json = resolve('public', 'json', `${import.meta.url.split("/").pop().split('.')[0]}.json`)

export default async (req: Request) => {
    if ((new URL(req.url).searchParams).get('save')) {
        let res = await find('website')

        sortTable(res, 'cat')
        fs.writeFile(json, JSON.stringify(res), 'utf-8')
    }

    return new Response(JSON.stringify(JSON.parse(await fs.readFile(json, 'utf-8'))), {
        headers: { 'access-control-allow-origin': '*' }
    })
}