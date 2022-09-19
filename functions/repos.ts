
import { Handler } from '@netlify/functions'
import axios from 'axios'

var url = 'https://api.github.com/graphql'

export const handler: Handler = async (event) => {
    var query = `{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 3) { nodes { name description homepageUrl pushedAt }}}}`

    var res = (await axios.request({
        url: url,
        method: 'POST',
        headers: { "Authorization": "bearer " + process.env.ghtoken, },
        data: JSON.stringify({ query })
    })).data
    res = res.data.repositoryOwner.repositories.nodes

    res = res.map(({ name: repo, description, homepageUrl: url, pushedAt, ...rest }: { name: string, description: string, homepageUrl: string, pushedAt: string }) => ({ repo, description, date: pushedAt.substring(0, 10), url, ...rest }))

    // console.log(res)
    return { statusCode: 200, body: JSON.stringify(res) }
}