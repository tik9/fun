import { getGhGraph } from "./utils"

import { resolve } from 'path'
import { promises as fs } from 'fs'


let json = resolve('public', `json/${import.meta.url.split("/").pop().split('.')[0]}.json`)

export default async (req) => {
    if (new URL(req.url).searchParams.get('save'))
        await queryRepos()
    let res = await fs.readFile(json, 'utf-8')

    return new Response(res)
}


async function queryRepos() {
    let jsonQuery = {
        "queryString": "is:public archived:false created:<2020-01-01 pushed:>2024-02-01",
        "refOrder": {
            "direction": "DESC",
            "field": "TAG_COMMIT_DATE"
        }
    }

    let query = `query listRepos($queryString: String!){
        rateLimit{
         cost
         remaining
         resetAt
        }
        search(query:$queryString, type:REPOSITORY, first:3){
         repositoryCount
         pageInfo{
          endCursor
          startCursor
         }
         edges{
          node{
           ... on Repository{
            description 
            name
            url
            defaultBranchRef{
             target{
              ... on Commit{
               history(first:3){
                edges{
                 node{
                  ... on Commit{
                   committedDate
                   message
                }
                 }
                }
               }
              }
             }
            }
           }
          }
         }
        }
       }`

    let res = (await getGhGraph(query, jsonQuery)).data.search.edges
    res = res.map(elem => ({ name: elem.node.name, description: elem.node.description, commits: elem.node.defaultBranchRef.target.history.edges.map(elem => ({ date: new Date(elem.node.committedDate).toLocaleDateString('de-de', { year: "numeric", day: "2-digit", month: "2-digit" }), message: elem.node.message })) }))

    fs.writeFile(json, JSON.stringify(res))
}


export async function getOneRepo(repo: string) {
    var query = `query {repository (name:"${repo}" , owner: "tik9")  {id name description homepageUrl}}`;

    return await getGhGraph(query)
    // console.log(1, res.data.repository.id)
}