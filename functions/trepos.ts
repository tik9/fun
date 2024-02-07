
import { getGhGraph, locale_date } from './utils'
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

    let res = ((await getGhGraph(query)).data.repositoryOwner.repositories.nodes).map((elem) => ({ updated: locale_date(elem.pushedAt), url: elem.homepageUrl, name: elem.name, description: elem.description, }))
    console.log(res)
    fs.writeFile(json, JSON.stringify(res))
}