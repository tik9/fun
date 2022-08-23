
import fetch from 'node-fetch';
import * as file from './file'
import * as utils from './utils'

export async function handler(event) {
    try {
        var res = await fetch(`https://api.stackexchange.com/2.2/users/1705829/comments?site=stackoverflow&filter=withbody`);

        res = (await res.json()).items.slice(0, 8);

        res.sort(utils.sortOne('-score'));
        res = res.map(obj => (
            obj.creation_date ? {
                date: new Date(obj.creation_date * 1000).toISOString().substring(0, 10),
                text: utils.truncate(obj.body),
                score: obj.score,
                url: 'https://stackexchange.com/users/1886776/timo?tab=activity',
            } : {}))

        return {
            body: JSON.stringify(1),
            statusCode: 200
        }
    } catch (error) { console.log(2, error) }
}