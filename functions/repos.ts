
import { getHelp } from './graphquery'
import { promises as fs } from 'fs'
import { resolve } from 'path'

export default async (req: Request) => {

    var res

    res = await fs.readFile(resolve('public', 'json/repos.json'), 'utf-8')

    if (new URL(req.url).searchParams.get('save'))
        fs.writeFile(resolve('public', 'json/repos.json'), res)
    //@ts-ignore
    // console.log(res)
    return new Response(res)
}

async function first() {
    var query = `query{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 3) { nodes { name description homepageUrl pushedAt }}}}`

    //@ts-ignore
    var res = (await getHelp(query)).data.repositoryOwner.repositories.nodes
    //@ts-ignore
    return res.map(({ homepageUrl: url, pushedAt, ...rest }: { name: string, description: string, homepageUrl: string, pushedAt: string }) => ({ pushedAt: pushedAt.substring(0, 10), url, ...rest }))
}