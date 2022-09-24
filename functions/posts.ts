
import axios from 'axios';

import { truncate } from './utils'

export async function handler() {
    var res = (await axios.get('https://api.stackexchange.com/2.2/users/1705829/comments?site=stackoverflow&filter=withbody')).data

    res = res.items.slice(0, 2);

    res = res.map(({ creation_date: date, body: text }: { body: string, creation_date: number }) => (
        {
            date: new Date(date * 1000).toISOString().substring(0, 10),
            text: truncate(text, 100),
            url: 'https://stackexchange.com/users/1886776/timo?tab=activity',
        }))
    return {
        body: JSON.stringify(res),
        statusCode: 200
    }
}