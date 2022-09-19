
import axios from 'axios';
import { IntegerType } from 'mongodb';

export async function handler() {
    let url = process.env.URL + '/.netlify/functions/'
    let url_utils = url + 'utils?'

    var res = (await axios.get('https://api.stackexchange.com/2.2/users/1705829/comments?site=stackoverflow&filter=withbody')).data

    res = res.items.slice(0, 2);

    res = res.map(({ creation_date: date, body: text }: { body: string, creation_date: number }) => (
        {
            date: new Date(date * 1000).toISOString().substring(0, 10),
            text,
            url: 'https://stackexchange.com/users/1886776/timo?tab=activity',
        }))
    return {
        body: JSON.stringify(res),
        statusCode: 200
    }
}

export function truncate(text: string, size = 100) {
    text = text.replace(/<\/?(.*?)>/g, "");
    if (text.length > size) {
        var subString = text.slice(0, size);
        var body = subString.slice(0, subString.lastIndexOf(" ")) + "..";
        return body
    }
    return text
}