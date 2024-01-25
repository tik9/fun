import { truncate, getGhGraph } from "./utils"
import { resolve } from 'path'
import { promises as fs } from 'fs'

let json = resolve('public', `json/${__filename.split(__dirname + "/").pop()?.split('.')[0]}.json`)
let graphOrig = resolve('public', 'json', 'graphOrig.json')
let graphFlat = resolve('public', 'json', 'graphFlat.json')

export default async () => {
    let res = JSON.parse(await fs.readFile(json, 'utf-8'))
    // let branchref = elem.node.defaultBranchRef.target.history.edges

    return new Response(JSON.stringify(res))
}

async function updateJson() {
    let { jsonQuery, query } = queryRepos()
    let res = (await getGhGraph(query, jsonQuery)).data.search.edges
    res = res.map(elem => flattenObject(elem))
    fs.writeFile(json, JSON.stringify(res))
}

export const flattenObject = (obj) => {
    const flattened = {}

    Object.keys(obj).forEach((key) => {
        const value = obj[key]

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // console.log(1, value)
            Object.assign(flattened, flattenObject(value))
        }
        else {
            if (key === 'message') truncate(value)
            flattened[key] = value
            // console.log(2, key, value)
        }
    })

    return flattened
}

function queryRepos() {
    let jsonQuery = {
        "queryString": "is:public archived:false created:<2020-01-01 pushed:>2024-01-01",
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
            name
            pushedAt 
            description 
            url
            stargazers{totalCount}

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