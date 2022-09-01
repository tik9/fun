
import * as utils from './modules/utils.js'
import * as mongo from './mongo.js'


export async function handler(event) {
    var gh_url = 'https://api.github.com/users/tik9/repos'
    var repos = 'repos'
    try {
        var res = await (await fetch(gh_url)).json()
        res = res.map(obj => ({ repo: obj.name, stars: obj.watchers, description: obj.description, date: obj.updated_at.slice(0, 10) }))

        res = res.sort(utils.sort('-date')).slice(0, 5)
        mongo.truncate_coll(repos)
        mongo.insert_val(repos, res)
        // console.log(res)
        return { statusCode: 200, body: JSON.stringify(1) }
    } catch (error) { console.log(error) }
}