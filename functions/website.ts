import { sortTable } from './utils'
import { find } from './mongo'
import { resolve } from 'path'
import { promises as fs } from "fs";

var json = import.meta.url.split("/").pop().split('.')[0]
json = resolve('public', 'json', `${json}.json`)

export default async (req: Request) => {
    let res
    if ((new URL(req.url).searchParams).get('save')) {
        res = await find('website')

        sortTable(res, 'cat')
        fs.writeFile(json, JSON.stringify(res), 'utf-8')
    }
    res = JSON.parse(await fs.readFile(json, 'utf-8'))

    return new Response(JSON.stringify(res), {
        headers: { 'access-control-allow-origin': '*' }
    })
}