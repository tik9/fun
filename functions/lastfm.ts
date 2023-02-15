
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
    // if (typeof (res_artist[0].image[0]) !== 'undefined') res_artist[0].img = res_artist[0].image[0]['#text'];
    // res_artist = (({ name, img, mbid, url }) => ({ name, img, mbid, url }))(res_artist);

    // does not work
    var new_arr = ['listeners', 'streamable'].forEach(element => { delete res_artist[element] });

    const replacer = (key: string, value: any) => value === null ? '' : value
    const header = Object.keys(res_artist[0])
    res_artist = [header.join(','),
    // @ts-ignore
    ...res_artist.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    console.log(res_artist)

    // e.g. artist=xssxs
    if (typeof (res_artist) === 'undefined') {
        res = JSON.parse(await fs.readFile(resolve('public', 'json/artists.json'), 'utf-8'))
        //     console.log(2, res)
    } else
        fs.writeFile(resolve('public', 'res_lastfm.csv'), JSON.stringify(res_artist))
    // console.log(1, res_artist)

    return { statusCode: 200, body: JSON.stringify(res_artist) }

}
