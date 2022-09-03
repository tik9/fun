
import axios from 'axios'
import * as mongo from './mongo.js'

export async function handler(event) {
    var cloud_arr = [
        { name: "stack", url: 'http://api.stackexchange.com/2.2/users/1705829?site=stackoverflow', link: 'link' },
        { name: "git", url: 'http://api.github.com/users/tik9', link: 'html_url' }
    ]
    var obj = {}
    for (var elem of cloud_arr) {
        var res = (await axios.get(elem.url)).data
        if (elem.name == 'stack') res = res.items[0]
        obj[elem.name] = res[elem.link]
    }
    // mongo.truncate_coll('accounts')
    // mongo.insert_val('accounts', obj)
    return { statusCode: 200, body: JSON.stringify(obj) }
}
