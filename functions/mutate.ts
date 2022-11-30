
import { Handler } from '@netlify/functions'
import { axiosHelp, getOneRepo } from './graphquery'

//@ts-ignore
export var handler: Handler = async () => {
    var description = 'github repos info | SO posts'
    var url = 'https://tiremaster.gatsbyjs.io'
    var res = await getOneRepo('repos')
    //@ts-ignore
    var id = res.data.repository.id
    var query
    query = `mutation {updateRepository(input: { clientMutationId: "tik9", description: "${description}", repositoryId: "${id}",homepageUrl:"${url}" }) {clientMutationId repository{name description } }}`

    // query = `mutation {createRepository(input: {name: "te",visibility: PUBLIC}) {repository {url}}}`

    res = await axiosHelp(query)
    console.log(1, id, 2, query)
    return { statusCode: 200, body: res }
}