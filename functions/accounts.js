
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import * as mongo from './mongo'
dotenv.config()

export async function handler(event) {
    var arr = [
        { stack: { url: 'http://api.stackexchange.com/2.2/users/1705829?site=stackoverflow', props: 'reputation' } },
        { git: { url: 'http://api.github.com/users/tik9', props: 'followers' } },

        { hero: { headers: { Accept: 'application/vnd.heroku+json; version=3', Authorization: 'Bearer ' + process.env.hero }, url: 'https://api.heroku.com/account', props: '' }, },
        { netlify: { headers: { Authorization: 'Bearer ' + process.env.netlify }, url: 'https://api.netlify.com/api/v1/user', props: 'site_count' } }
    ]
    var obj = []
    for (var elem of arr) {
        var key = Object.keys(elem)[0]
        var val = elem[key]
        var headers = val.headers
        var res = await (await fetch(val.url, { headers })).json()
        if (Object.keys(elem) == 'stack') res = res.items[0]

        var obj1 = {}
        for (var prop of [val.props].flat()) {
            var resprop = res[prop]

            if (prop == '') continue
            obj1[prop] = resprop
        }
        var { hostname } = new URL(val.url);
        obj1.url = hostname
        obj1.provider = key
        obj.push(obj1)
    }
    // console.log(obj)
    mongo.insert_val('accounts', obj)
    return { statusCode: 200, body: JSON.stringify(obj) }
}
