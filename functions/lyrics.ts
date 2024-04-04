
import { promises as fs } from "fs"
import { resolve } from 'path'
import youtubeSearch from "youtube-search";
import { YoutubeTranscript } from 'youtube-transcript';


let json = resolve('public', `json/${__filename.split(__dirname + "/").pop().split('.')[0]}.json`)

export default async (req: Request) => {
    let res
    if (new URL(req.url).searchParams.get('save'))
        res = await getSong()
    // res = await getYt()
    // let ts = await YoutubeTranscript.fetchTranscript('4F_RCWVoL4s')

    // console.log(ts);

    res = JSON.stringify(await fs.readFile(json, 'utf-8'))
    return new Response(res)
}


async function getYt(search = 'cynical') {
    var opts: youtubeSearch.YouTubeSearchOptions = {
        maxResults: 1,
        key: process.env.youtube,
        type: 'video'
    };

    let res = await youtubeSearch(search, opts)
    return res.results[0].link
}

async function getSong() {

    let writer = 'van morrison'
    let song = 'brown eyed girl'
    let arrs
    let obj: { [k: string]: any } = {};

    let lyrics = (await (await fetch(`https://api.lyrics.ovh/v1/${writer}/${song}`)).json()).lyrics

    lyrics = lyrics.slice(0, 100)

    let link = await getYt(song)

    if (lyrics) {
        arrs = lyrics.split("\n");
        arrs.shift();
        lyrics = arrs.join("\n");
        obj.lyrics = lyrics
    }
    let songs = JSON.parse(await fs.readFile(json, 'utf-8'))
    obj.writer = writer
    obj.link = link
    obj.song = song

    console.log(obj)
    songs.unshift(obj)
    // fs.writeFile(json, JSON.stringify(songs))
}