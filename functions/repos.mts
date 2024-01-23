import { getGhGraph } from "./utils.mjs"

export default async (req: Request) => {
    let { json, query } = queryRepos()

    let res = await getGhGraph(query, json)
    res = res.data.search.edges
    for (let elem of res) console.log(elem)
    let arr = res[0]
    res = flattenObject(arr)
    let stargazers = arr.node.stargazers
    // let url_owner = res.node.owner.url
    let branchref = arr.node.defaultBranchRef.target.history.edges
    // let mapped = res.map(({ description, url_owner, users }: { description, url_owner, users }) => ({ users, url_owner, description }))
    console.log(res)
    // return new Response(JSON.stringify(res))
}

export const flattenObject = (obj) => {
    const flattened = {}

    Object.keys(obj).forEach((key) => {
        const value = obj[key]

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) Object.assign(flattened, flattenObject(value))
        else flattened[key] = value
    })

    return flattened
}

function queryRepos() {
    let json = {
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
        search(query:$queryString, type:REPOSITORY, first:2){
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
    return { json, query }
}


export async function getOneRepo(repo: any) {
    var query = `query {repository (name:"${repo}" , owner: "tik9")  {id name description homepageUrl}}`;

    return await getGhGraph(query)
    // console.log(1, res.data.repository.id)
}

async function rate() {
    return await getGhGraph(`query {viewer {login}rateLimit {limit remaining resetAt}}`)
}