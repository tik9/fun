
import { Handler } from '@netlify/functions'

import axios from 'axios'
import { promises as fs } from 'fs'
import { resolve } from 'path'

export var handler: Handler = async (event) => {
    // var artist = 'cher'
    var artist = event.queryStringParameters!.artist
    var url = 'https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + artist + '&api_key=' + process.env.lastfm + '&format=json'
    var res = (await axios.get(url)).data
    var res_artist = res.results.artistmatches.artist
    res_artist = res_artist.map((elem: any) => ({ name: elem.name, url: elem.url, image: elem.image.filter((elem: any) => elem.size === 'small')[0]['#text'] }))

    // e.g. artist=xssxs
    if (res_artist.length === 0) {
        res_artist = JSON.parse(await fs.readFile(resolve('public', 'json/artists.json'), 'utf-8'))
        //     console.log(2, res)
    }

    console.log(1, res_artist)

    return { statusCode: 200, body: JSON.stringify(res_artist) }
}
