
import { Handler } from '@netlify/functions'

import axios from 'axios'

export var handler: Handler = async (event) => {
    // var artist = 'cher'
    var artist = event.queryStringParameters!.artist
    var url = 'https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + artist + '&api_key=' + process.env.lastfm + '&format=json'
    var res = (await axios.get(url)).data
    var res_artist = res.results.artistmatches.artist[0]
    console.log(1, res)
    // e.g. xssxs
    if (typeof (res_artist) === 'undefined') {
        console.log('get json content')
    }
    return { statusCode: 200, body: JSON.stringify(res_artist) }

}
