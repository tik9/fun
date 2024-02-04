
import { getGhGraph } from './utils'
import { getOneRepo } from './repos'

import { resolve } from 'path'

let json = resolve('public', `json/${import.meta.url.split("/").pop().split('.')[0]}.json`)

export default async () => {
    let res

    return { statusCode: 200, body: res }
}


async function update(repo: string) {
    var description = 'hw'
    var url = ''
    let res = await getOneRepo(repo)

    var id = res.data.repository.id
    return `mutation {updateRepository(input: { clientMutationId: "tik9", description: "${description}", repositoryId: "${id}",homepageUrl:"${url}" }) { clientMutationId repository{name description } }}`
}

function create(repo: string) {
    return `mutation {createRepository(input: {name: "${repo}",visibility: PUBLIC}) { repository {url} }}`
}