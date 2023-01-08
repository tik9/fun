
import { Handler } from '@netlify/functions'
import { axiosHelp, getOneRepo } from './graphquery'

//@ts-ignore
export var handler: Handler = async () => {
    var description = 'My public repos and Stackoverflow posts'
    var url = 'tiremaster.gatsbyjs.io'
    var res = await getOneRepo('re')
    //@ts-ignore
    var id = res.data.repository.id
    var query = `mutation {updateRepository(input: { clientMutationId: "tik9", description: "${description}", repositoryId: "${id}",homepageUrl:"${url}" }) { clientMutationId repository{name description } }}`

    //@ts-ignore
    res = await axiosHelp(query)
    return { statusCode: 200, body: res }
}

function createRepo() {
    var query = `mutation {createRepository(input: {name: "te",visibility: PUBLIC}) { repository {url} }}`
}