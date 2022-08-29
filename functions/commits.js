
import * as utils from './utils.js'
import * as mongo from './mongo'


export async function handler(event) {
    var gh_url = 'https://api.github.com/users/tik9/repos'
    var type = 'commits'
    try {
        gh_url = 'https://api.github.com/repos/tik9/fun/commits'
        var res = await (await fetch(gh_url)).json()

        res = res.map(obj => ({ date: obj.commit.author.date.substring(0, 10), message: obj.commit.message, url: obj.html_url }))
        res = res.sort(utils.sort('-date')).slice(0, 6)
        mongo.truncate_coll(type)
        mongo.insert_val(type, res)
        return { statusCode: 200, body: JSON.stringify(1) }
    } catch (error) { console.log(error) }
}