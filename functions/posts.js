
import fetch from 'node-fetch';
import * as mongo from './mongo.js'
import * as utils from './modules/utils.js'

export async function handler(event) {
    try {
        var res = await fetch('https://api.stackexchange.com/2.2/users/1705829/comments?site=stackoverflow&filter=withbody');

        res = (await res.json()).items.slice(0, 5);

        res.sort(utils.sort('-score'));
        res = res.map(obj => (
            obj.creation_date ? {
                date: new Date(obj.creation_date * 1000).toISOString().substring(0, 10),
                text: utils.truncate(obj.body),
                score: obj.score,
                url: 'https://stackexchange.com/users/1886776/timo?tab=activity',
            } : {}))
        var posts = 'posts'
        mongo.truncate_coll(posts)
        await mongo.insert_val(posts, res)
        var res = await mongo.count(posts)
        // console.log(res)
        return {
            body: JSON.stringify(res),
            statusCode: 200
        }
    } catch (error) { console.log(2, error) }
}