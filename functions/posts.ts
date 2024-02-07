import { locale_date, truncate } from './utils'

import { promises as fs } from 'fs'
import { resolve } from 'path';

var script = __filename.split(__dirname + "/").pop().split('.')[0]
var json = resolve('public', `json/${script}.json`)

export default async (req: Request) => {

    if (new URL(req.url).searchParams.get('save'))
        await getPosts()
    return new Response((await fs.readFile(json, 'utf-8')))
}

async function getPosts() {
    var elem = 'comments'
    var res = (await (await fetch('https://api.stackexchange.com/2.2/users/1705829/' + elem + '?site=stackoverflow&filter=withbody')).json()).items.slice(0, 3)

    res = res.map(({ body: text, creation_date: date, post_id }) => (
        {
            date: locale_date(new Date(date * 1000).toISOString()),
            text: truncate(text),
            url: 'https://stackoverflow.com/questions/' + post_id,
            post_id
        }))
    fs.writeFile(json, JSON.stringify(res))
}