
import axios from 'axios'
import * as utils from './utils.js'
import * as mongo from './mongo.js'

var url = 'https://api.github.com/graphql'

export async function handler(event) {
    var query = `{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 3) { nodes { name description homepageUrl pushedAt }}}}`

    var res = (await axios.request({
        url: url,
        method: 'POST',
        headers: { "Authorization": "bearer " + process.env.ghtoken, },
        data: JSON.stringify({ query })
    })).data
    res = res.data.repositoryOwner.repositories.nodes

    res = res.map(({ name, description, homepageUrl: url, pushedAt, ...rest }) => ({ name, description, date: pushedAt.substring(0, 10), url, ...rest }))

    // mongo.truncate_coll(repos)
    // mongo.insert_val(repos, res)

    console.log(res)

    return { statusCode: 200, body: JSON.stringify(res) }

}