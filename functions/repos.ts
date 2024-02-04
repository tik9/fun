import { flattenObject, getGhGraph } from "./utils"

import { resolve } from 'path'
import { promises as fs } from 'fs'


let json = resolve('public', `json/${import.meta.url.split("/").pop().split('.')[0]}.json`)

export default async (req) => {
    if (new URL(req.url).searchParams.get('save'))
        await updateJson()
    let res = JSON.parse(await fs.readFile(json, 'utf-8'))
    res = res.map(elem => ({ name: elem.node.name, description: elem.node.description, 'Last commits': elem.node.defaultBranchRef.target.history.edges.map(commit => commit.node) }))
    res = res

    console.log(res)
    return new Response(JSON.stringify(res))
}

async function updateJson() {
    let { jsonQuery, query } = queryRepos()
    let res = (await getGhGraph(query, jsonQuery)).data.search.edges
    fs.writeFile(json, JSON.stringify(res))
}

function queryRepos() {
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
               history(first:2){
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
    return { jsonQuery, query }
}


export async function getOneRepo(repo: any) {
    var query = `query {repository (name:"${repo}" , owner: "tik9")  {id name description homepageUrl}}`;

    return await getGhGraph(query)
    // console.log(1, res.data.repository.id)
}

async function rate() {
    return await getGhGraph(`query {viewer {login}rateLimit {limit remaining resetAt}}`)
}