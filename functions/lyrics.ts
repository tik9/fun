
import { promises as fs } from "fs"
import { resolve } from 'path'

let json = resolve('public', `json/${__filename.split(__dirname + "/").pop().split('.')[0]}.json`)

export default async (req: Request) => {
    let res
    if (new URL(req.url).searchParams.get('save'))
        getLyric()
    res = JSON.stringify(await fs.readFile(json, 'utf-8'))
    return new Response(res)

}

async function getLyric() {
    let songs = JSON.parse(await fs.readFile(resolve('public', 'json', 'songs.json'), 'utf-8'))
    let arr = []
    for (const elem of songs) {
        var obj: { [k: string]: any } = {};
        let res = (await (await fetch(`https://api.lyrics.ovh/v1/${elem.writer}/${elem.song}`)).json()).lyrics
        let arrs = res.split("\n");
        obj.writer = elem.writer
        obj.song = elem.song
        arr.push(obj)
        arrs.shift();
        res = arrs.join("\n");
        obj.lyrics = res
    }
    fs.writeFile(json, JSON.stringify(arr))
}