
import axios from 'axios';

import { truncate } from './utils'

export async function handler() {
    let arr: Array<{ score: number, text: string, url: string, date: string }> = []
    for (var elem of ['posts', 'comments']) {
        var res = (await axios.get('https://api.stackexchange.com/2.2/users/1705829/' + elem + '?site=stackoverflow&sort=votes&filter=withbody')).data.items.slice(0, 2);

        res = res.map(({ body: text, creation_date: date, post_id, score }: { body: string, creation_date: number, post_id: number, score: number }) => (
            {
                date: new Date(date * 1000).toISOString().substring(0, 10),
                text: truncate(text, 100),
                url: 'https://stackoverflow.com/questions/' + post_id,
                score,
                type: elem.slice(0, -1),
                post_id
            }))
        arr.push(res)
    }
    arr = arr.flat()
    arr.sort((a, b) => a.score < b.score ? 1 : a.score > b.score ? -1 : 0)
    // console.log(arr)

    return {
        body: JSON.stringify(arr),
        statusCode: 200
    }
}