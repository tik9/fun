
import { promises as fs } from "fs"
import { resolve } from 'path'
import * as youtubeSearch from "youtube-search";

let json = resolve('public', `json/${__filename.split(__dirname + "/").pop().split('.')[0]}.json`)

export default async (req: Request) => {
    if (new URL(req.url).searchParams.get('save'))
        await addLyric()
    // getYt("jsconf")
    let res = JSON.stringify(await fs.readFile(json, 'utf-8'))
    return new Response(res)
}


async function getYt(search = 'jsconf') {
    var opts: youtubeSearch.YouTubeSearchOptions = {
        maxResults: 2,
        key: process.env.youtube
    };

    youtubeSearch(search, opts, (err, results) => {
        if (err) return console.log(err);

        console.dir(results);
    });
}

async function addLyric() {
    let writer = 'Neil Diamond'
    let song = 'Sweet Caroline'
    let res = (await (await fetch(`https://api.lyrics.ovh/v1/${writer}/${song}`)).json()).lyrics
    let songs = JSON.parse(await fs.readFile(json, 'utf-8'))

    let obj: { [k: string]: any } = {};
    obj.writer = writer
    obj.song = song
    let arrs = res.split("\n");
    arrs.shift();
    res = arrs.join("\n");
    obj.lyrics = res
    songs.unshift(obj)
    fs.writeFile(json, JSON.stringify(songs))
}


async function getLyric() {
    let songs = JSON.parse(await fs.readFile(json, 'utf-8'))
    // for (const elem of songs) {

}