
import { Handler } from '@netlify/functions'
import { axiosHelp, getOneRepo } from './query'

export var handler: Handler = async (event) => {
    var description = 'Aliases and functions with oh-my-zsh plugin'
    var repo = await getOneRepo()
    var id = repo.id

    var query = `mutation {updateRepository(input: { clientMutationId: "tik9", description: "${description}", repositoryId: "${id}" }) {clientMutationId repository{name description } }}`

    var res = await axiosHelp(query)
    console.log(1, id, 2, res)
    return { statusCode: 200, body: res }
}