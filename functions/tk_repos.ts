
import { getGhGraph } from './utils'
import { promises as fs } from 'fs'
import { resolve } from 'path'

let json = resolve('public', `json/${import.meta.url.split("/").pop().split('.')[0]}.json`)

export default async (req: Request) => {

    if (new URL(req.url).searchParams.get('save'))
        await getRepos()
    return new Response(await fs.readFile(json, 'utf-8'))

}

async function getRepos() {
    var query = `query{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 3) { nodes { name description pushedAt }}}}`

    let res = ((await getGhGraph(query)).data.repositoryOwner.repositories.nodes)

    res = res.map(elem => ({ date: new Date(elem.pushedAt).toLocaleDateString('de-de', { day: '2-digit', month: '2-digit', year: 'numeric' }), url: '//github.com/tik9/' + elem.name, name: elem.name, description: elem.description, }))
    fs.writeFile(json, JSON.stringify(res))
}