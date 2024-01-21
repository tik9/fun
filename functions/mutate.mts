
import { getGhGraph, getOneRepo } from './graph.mjs'

export default async () => {
    // var query = create('apo')
    var query = await update('')
    //@ts-ignore
    var res = await getGhGraph(query)
    return { statusCode: 200, body: res }
}

async function update(repo: string) {
    var description = 'hw'
    var url = ''
    var res = await getOneRepo(repo)
    //@ts-ignore
    var id = res.data.repository.id
    return `mutation {updateRepository(input: { clientMutationId: "tik9", description: "${description}", repositoryId: "${id}",homepageUrl:"${url}" }) { clientMutationId repository{name description } }}`
}

function create(repo: string) {
    return `mutation {createRepository(input: {name: "${repo}",visibility: PUBLIC}) { repository {url} }}`
}