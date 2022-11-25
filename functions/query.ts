
import { Handler } from '@netlify/functions'
import axios from 'axios';

export var handler: Handler = async () => {
    var res
    console.log(1, await getOneRepo())
    return { statusCode: 200, body: res }
}

export async function axiosHelp(query: string, vars: string = '') {
    console.log(vars, query)
    return (await axios.request({
        url: 'https://api.github.com/graphql',
        method: 'POST',
        headers: { "Authorization": "bearer " + process.env.ghtoken, },
        data: JSON.stringify({ query, variables: { vars } })
    })).data
}

export async function getOneRepo(repo = 'custom') {
    var query = `query {repository (name:"${repo}" , owner: "tik9")  {id description homepageUrl}}`;
    return (await axiosHelp(query)).data.repository
}