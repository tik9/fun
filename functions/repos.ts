
import { Handler } from '@netlify/functions'
import { axiosHelp } from './graphquery'

export const handler: Handler = async () => {
    var res
    // res = await first()
    res = await allRepos()
    //@ts-ignore
    console.log(res.data.repositoryOwner.repositories.nodes)
    return { statusCode: 200, body: JSON.stringify(res) }
}

async function allRepos() {
    var query = `query{repositoryOwner(login: "tik9") { repositories (orderBy: { field: NAME, direction: ASC },first:20) { nodes { name }}}}`
    var res = await axiosHelp(query)
    return res
}

async function first() {
    var query = `query{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 2) { nodes { id name description homepageUrl pushedAt }}}}`

    //@ts-ignore
    var res = (await axiosHelp(query)).data.repositoryOwner.repositories.nodes
    //@ts-ignore
    res = res.map(({ homepageUrl: url, pushedAt, ...rest }: { name: string, description: string, homepageUrl: string, pushedAt: string }) => ({ pushedAt: pushedAt.substring(0, 10), url, ...rest }))
    return res
}