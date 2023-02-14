
import { Handler } from '@netlify/functions'
import fetch from 'node-fetch';

export var handler: Handler = async (event) => {
    var res
    var params = event.queryStringParameters!.q

    //@ts-ignore
    res = (await getOneRepo('re')).data.repository.description
    console.log(1, res)
    return { statusCode: 200, body: res }
}

export async function axiosHelp(query: string, vars: string = '') {
    // console.log(1, vars, query)
    var res = await (await fetch('https://api.github.com/graphql', { method: 'POST', headers: { "Authorization": "bearer " + process.env.ghtoken }, body: JSON.stringify({ query: query, variables: { vars } }) })).json()
    return res
}

export async function getOneRepo(repo = 'custom') {
    var query = `query {repository (name:"${repo}" , owner: "tik9")  {id name description homepageUrl}}`;

    // query = `query{repositoryOwner(login: "tik9"){id login repositories(first: 1) { edges {node {id name}}}}}`
    var res = {}
    //@ts-ignore
    res = await axiosHelp(query)
    // console.log(1, res.data.repositoryOwner.repositories.edges)
    // console.log(1, res.data.repository.id)
    return res
}

async function rate() {
    return await axiosHelp(`query {viewer {login}rateLimit {limit remaining resetAt}}`)
}