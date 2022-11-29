
import { Handler } from '@netlify/functions'
import { axiosHelp } from './graphquery'

export const handler: Handler = async () => {

    var query = `query{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 4) { nodes { name description homepageUrl pushedAt }}}}`

    var res = await axiosHelp(query)
    // console.log(1, res,)
    //@ts-ignore
    res = res.data.repositoryOwner.repositories.nodes
    //@ts-ignore
    res = res.map(({ name: repo, description, homepageUrl: url, pushedAt, ...rest }: { name: string, description: string, homepageUrl: string, pushedAt: string }) => ({ repo, description, date: pushedAt.substring(0, 10), url, ...rest }))

    return { statusCode: 200, body: JSON.stringify(res) }
}