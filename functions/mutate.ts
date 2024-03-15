
import { getGhGraph } from './utils'
import { getOneRepo } from './repos'

import { resolve } from 'path'

let json = resolve('public', `json/${import.meta.url.split("/").pop().split('.')[0]}.json`)

export default async () => {
    let res = await createIssue()
    console.log(res)
    return new Response(res)
}

async function createIssue(repo = 'fun') {
    let id = (await getOneRepo(repo)).data.repository.id
    let title = 'get date in tables with age in days'
    let body = 'e.g.  - 1 day ago - if the table entry is one day before the current date'

    let res = getGhGraph(`mutation CreateIssue {createIssue(input: {repositoryId: "${id}", title: "${title}", body: "${body}"}) {issue { number body}}}`)
    return res
}

async function update() {
    let repo = 'apps'
    let description = 'Motivation letter and CV in markdown and js'
    let url = 'https://tiapps.netlify.app'

    let res = await getOneRepo(repo)

    var id = res.data.repository.id
    console.log(res)

    return getGhGraph(`mutation {updateRepository(input: { clientMutationId: "tik9", description: "${description}", repositoryId: "${id}",homepageUrl:"${url}" }) { clientMutationId repository{name description } }}`)
}

function createRepo() {
    let repo = ''
    return `mutation {createRepository(input: {name: "${repo}",visibility: PUBLIC}) { repository {url} }}`
}