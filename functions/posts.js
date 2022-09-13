
import axios from 'axios';
import * as utils from './utils.js'

export async function handler(event) {
    var res = await axios.get('https://api.stackexchange.com/2.2/users/1705829/comments?site=stackoverflow&filter=withbody');

    res = res.data.items.slice(0, 5);

    res.sort(utils.sort('-score'));
    res = res.map(obj => (
        obj.creation_date ? {
            date: new Date(obj.creation_date * 1000).toISOString().substring(0, 10),
            text: utils.truncate(obj.body),
            url: 'https://stackexchange.com/users/1886776/timo?tab=activity',
        } : {}))
    return {
        body: JSON.stringify(res),
        statusCode: 200
    }
}