
import { Handler } from '@netlify/functions'
import { axiosHelp, getOneRepo } from './graphquery'

//@ts-ignore
export var handler: Handler = async () => {
    // var query = create('apo')
    var query = await update('apo')
    //@ts-ignore
    var res = await axiosHelp(query)
    return { statusCode: 200, body: res }
}

async function update(repo: string) {
    var description = 'Apollo and React'
    var url = ''
    var res = await getOneRepo(repo)
    //@ts-ignore
    var id = res.data.repository.id
    return `mutation {updateRepository(input: { clientMutationId: "tik9", description: "${description}", repositoryId: "${id}",homepageUrl:"${url}" }) { clientMutationId repository{name description } }}`
}

function create(repo: string) {
    return `mutation {createRepository(input: {name: "${repo}",visibility: PUBLIC}) { repository {url} }}`
}