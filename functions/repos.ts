
import { getHelp } from './graphquery'
import { promises as fs } from 'fs'
import { resolve } from 'path'

var script = __filename.split(__dirname + "/").pop()?.split('.')[0]
var json = resolve('public', `json/${script}.json`)

export default async (req: Request) => {

    if (new URL(req.url).searchParams.get('save'))
        getRepos()
    return new Response(await fs.readFile(json, 'utf-8'))

}

async function getRepos() {
    var query = `query{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 3) { nodes { name description homepageUrl pushedAt }}}}`

    //@ts-ignore
    var res = (await getHelp(query)).data.repositoryOwner.repositories.nodes

    fs.writeFile(json, res)

    return res.map(({ homepageUrl: url, pushedAt, ...rest }: { name: string, description: string, homepageUrl: string, pushedAt: string }) => ({ pushedAt: pushedAt.substring(0, 10), url, ...rest }))
}