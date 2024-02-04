
import { getGhGraph } from './utils'
import { promises as fs } from 'fs'
import { resolve } from 'path'

let json = resolve('public', `json/${__filename.split(__dirname + "/").pop()?.split('.')[0]}.json`)

export default async (req: Request) => {

    if (new URL(req.url).searchParams.get('save'))
        getRepos()
    return new Response(await fs.readFile(json, 'utf-8'))

}

async function getRepos() {
    var query = `query{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 3) { nodes { name description homepageUrl pushedAt }}}}`

    let res = ((await getGhGraph(query)).data.repositoryOwner.repositories.nodes).map(({ homepageUrl: url, pushedAt, ...rest }: { name: string, description: string, homepageUrl: string, pushedAt: string }) => ({ pushedAt: pushedAt.substring(0, 10), url, ...rest }))

    fs.writeFile(json, JSON.stringify(res))
}