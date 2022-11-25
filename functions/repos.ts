
import { Handler } from '@netlify/functions'
import { axiosHelp } from './query'

export const handler: Handler = async () => {
    var query = '{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 4) { nodes { name description homepageUrl pushedAt }}}}'

    var res = await axiosHelp(query)
    res = res.data.repositoryOwner.repositories.nodes

    res = res.map(({ name: repo, description, homepageUrl: url, pushedAt, ...rest }: { name: string, description: string, homepageUrl: string, pushedAt: string }) => ({ repo, description, date: pushedAt.substring(0, 10), url, ...rest }))

    console.log(res)
    return { statusCode: 200, body: JSON.stringify(res) }
}