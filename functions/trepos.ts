
import { getGhGraph } from './utils'
import { promises as fs } from 'fs'
import { resolve } from 'path'

let json = resolve('public', `json/${__filename.split(__dirname + "/").pop().split('.')[0]}.json`)

export default async (req: Request) => {

    if (new URL(req.url).searchParams.get('save'))
        getRepos()
    return new Response(await fs.readFile(json, 'utf-8'))

}

async function getRepos() {
    var query = `query{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 3) { nodes { name description homepageUrl pushedAt }}}}`

    let res = ((await getGhGraph(query)).data.repositoryOwner.repositories.nodes).map((elem) => ({ updated: new Date(elem.pushedAt).toLocaleDateString('de-de', { day: 'numeric', month: 'numeric', year: 'numeric' }), url: elem.homepageUrl, name: elem.name, description: elem.description, }))
    fs.writeFile(json, JSON.stringify(res))
}