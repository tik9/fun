import { promises as fs } from 'fs'
import { resolve } from 'path';

import { truncate } from './utils.mjs'

var script = __filename.split(__dirname + "/").pop()?.split('.')[0]
var json = resolve('public', `json/${script}.json`)

export default async (req: Request) => {

    if (new URL(req.url).searchParams.get('save'))
        getPosts()
    return new Response((await fs.readFile(json, 'utf-8')))
}

async function getPosts() {
    var elem = 'comments'
    var res = (await (await fetch('https://api.stackexchange.com/2.2/users/1705829/' + elem + '?site=stackoverflow&filter=withbody')).json()).items.slice(0, 3)

    res = res.map(({ body: text, creation_date: date, post_id, score }: { body: string, creation_date: number, post_id: number, score: number }) => (
        {
            date: new Date(date * 1000).toISOString().substring(0, 10),
            text: truncate(text, 100),
            url: 'https://stackoverflow.com/questions/' + post_id,
            post_id
        }))

    fs.writeFile(json, JSON.stringify(res))
}