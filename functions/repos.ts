
import { Handler } from '@netlify/functions'
import { axiosHelp } from './graphquery'

export const handler: Handler = async () => {

    var query = `query{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 4) { nodes { id name description homepageUrl pushedAt }}}}`

    var res = await axiosHelp(query)
    //@ts-ignore
    res = res.data.repositoryOwner.repositories.nodes
    //@ts-ignore
    res = res.map(({ homepageUrl: url, pushedAt, ...rest }: { name: string, description: string, homepageUrl: string, pushedAt: string }) => ({ pushedAt: pushedAt.substring(0, 10), url, ...rest }))

    return { statusCode: 200, body: JSON.stringify(res) }
}