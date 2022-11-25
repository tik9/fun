
import { Handler } from '@netlify/functions'
import axios from 'axios';

export var url = 'https://api.github.com/graphql'

export var handler: Handler = async () => {
    var res
    console.log(1, await getOneRepo())
    return { statusCode: 200, body: res }
}

export async function axiosHelp(query: string) {
    return (await axios.request({
        url: url,
        method: 'POST',
        headers: { "Authorization": "bearer " + process.env.ghtoken, },
        data: JSON.stringify({ query })
    })).data
}

export async function getOneRepo(repo = 'custom') {
    var query = `query {repository (name:"${repo}" , owner: "tik9")  {id description homepageUrl}}`;
    var res = await axiosHelp(query)
    return res.data.repository
}