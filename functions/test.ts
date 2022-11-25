
import { Handler } from '@netlify/functions'
import axios from 'axios';

export var handler: Handler = async () => {
    var res
    console.log(1, await rate_limit(), 2, await repos())
    return { statusCode: 200, body: res }
}

export default async function repos() {
    //@ts-ignore
    return ((await axios.get('https://api.github.com/users/tik9/repos')).data).slice(0, 3).map(obj => ({ repo: obj.name, description: obj.description, update: obj.updated_at.slice(0, 10), url: obj.html_url }))
}

export async function rate_limit() {
    var url = 'https://api.github.com/rate_limit'
    try { var res = (await axios.get(url)).data } catch (error) { console.log('err') }
    return res.resources.core
}
