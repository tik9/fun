
import { Handler } from '@netlify/functions'
import { axiosHelp, getOneRepo } from './graphquery'

//@ts-ignore
export var handler: Handler = async () => {
    var description = 'Git with Python'
    // var url = 'https://tire.netlify.app'
    var url = ''
    var res = await getOneRepo('gman')
    //@ts-ignore
    var id = res.data.repository.id
    // console.log(1, id)
    var query = `mutation {updateRepository(input: { clientMutationId: "tik9", description: "${description}", repositoryId: "${id}",homepageUrl:"${url}" }) { clientMutationId repository{name description } }}`

    // query = `mutation {createRepository(input: {name: "te",visibility: PUBLIC}) { repository {url} }}`

    //@ts-ignore
    res = await axiosHelp(query)
    console.log(1, query)
    return { statusCode: 200, body: res }
}