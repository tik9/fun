
import dotenv from 'dotenv'
import * as file from './file'
// var file = require('./filehelp.js')
dotenv.config()

export async function handler(event, context) {
    var arr = [
        { stack: { url: 'http://api.stackexchange.com/2.2/users/1705829?site=stackoverflow', props: ['reputation', 'last_access_date'] } },
        { git: { url: 'http://api.github.com/users/tik9', props: ['updated_at', 'followers'] } },

        { hero: { headers: { Accept: 'application/vnd.heroku+json; version=3', Authorization: 'Bearer ' + process.env.hero }, url: 'https://api.heroku.com/account', props: ['updated_at', 'last_login'] }, },
        { netlify: { headers: { Authorization: 'Bearer ' + process.env.netlify }, url: 'https://api.netlify.com/api/v1/user', props: ['site_count', 'last_login'] } }
    ]
    var obj = []
    for (var elem of arr) {
        var key = Object.keys(elem)[0]
        var val = elem[key]
        var headers = val.headers
        var res = await (await fetch(val.url, { headers })).json()
        if (Object.keys(elem) == 'stack') res = res.items[0]

        var obj1 = {}
        var obj2 = {}
        for (var prop of val.props) {
            var resprop = res[prop]

            if (/^\d{4}-\d{2}-\d{2}/.test(resprop))
                resprop = resprop.substring(0, 10)
            else if (prop == 'last_access_date')
                resprop = (new Date(resprop * 1000)).toISOString().substring(0, 10)
            obj2[prop] = resprop
        }
        var { hostname } = new URL(val.url);
        obj2.url = hostname
        obj1[key] = obj2
        obj.push(obj1)
    }
    file.writeJs('./json/accounts.json', obj)

    return {
        statusCode: 200, body: JSON.stringify(obj)
    }
}


function account_hero(data) {
    var new_obj = {}
    new_obj.last_login = data.last_login
    new_obj.updated_at = data.updated_at
    return new_obj
}


function account_net(data) {
    var new_obj = {}
    new_obj.last_login = data.last_login
    new_obj.site_count = data.site_count

    return new_obj
}

function account_stack(data) {
    var new_obj = {}

    new_obj.last_access_date = (new Date(data.last_access_date * 1000).toISOString()).substring(0, 10)
    new_obj.reputation = data.reputation
    return new_obj
}

function account_git(data) {
    var new_obj = {}

    new_obj.updated_at = data.updated_at.toString().substring(0, 10)
    new_obj.followers = data.followers
    return new_obj
}