
import { Handler } from '@netlify/functions'
import axios from 'axios';

export var handler: Handler = async () => {
    var res
    // res = await (await fetch("https://icanhazdadjoke.com", { headers: { Accept: "application/json", "user-agent": "tiapo.netlify.app, timo@tik1.net" } })).json()
    // res = res.data
    // console.log(1, await repos(), await rate_limit())
    // runThenFunction()
    // runAwaitFunction()
    return { statusCode: 200, body: JSON.stringify(res) }
}
async function testTime() {
    await setTimeout(() => {
        console.log(123)
    }, 2000);
}

export default async function repos() {
    //@ts-ignore
    var res = await (await fetch('https://api.github.com/users/tik9/repos')).json()
    res = res.map(({ name, description }: { name: string, description: string }) => ({ name, description }))
    return res
}

export async function rate_limit() {
    var url = 'https://api.github.com/rate_limit'
    try { var res = (await axios.get(url)).data } catch (error) { console.log('err') }
    return res.resources.core
}