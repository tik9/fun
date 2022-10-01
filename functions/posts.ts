
import axios from 'axios';

import { truncate } from './utils'

export async function handler() {
    var arr: string[] = []
    for (var elem of ['posts', 'comments']) {
        var res = (await axios.get('https://api.stackexchange.com/2.2/users/1705829/' + elem + '?site=stackoverflow&sort=votes&filter=withbody')).data

        res = res.items.slice(0, 3);

        res = res.map(({ body: text, creation_date: date, post_id, score }: { body: string, creation_date: number, post_id: number, score: number }) => (
            {
                date: new Date(date * 1000).toISOString().substring(0, 10),
                text: truncate(text, 100),
                url: 'https://stackoverflow.com/questions/' + post_id,
                score,

            }))
        arr.push(res)
    }
    arr = [...arr[0], ...arr[1]]
    // console.log(1, arr)
    return {
        body: JSON.stringify(arr),
        statusCode: 200
    }
}