
export default async (req: Request) => {
    let { json, query } = queryRepos()

    let res = await getGhGraph(query, json)
    console.log(res.data.search.edges)

    return new Response(JSON.stringify(res.data.search.edges))

    // data.repository.description)
}

export async function getGhGraph(query: string, vars = {}) {
    return await (await fetch('https://api.github.com/graphql', { method: 'POST', headers: { "Authorization": "bearer " + process.env.ghtoken }, body: JSON.stringify({ query: query, variables: vars }) })).json()
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
        search(query:$queryString, type:REPOSITORY, first:3){
         repositoryCount
         pageInfo{
          endCursor
          startCursor
         }
         edges{
          node{
           ... on Repository{
            id
            name
            createdAt 
            description 
            isArchived
            isPrivate
            url
            owner{
             login
             id
             __typename
             url
            }
            assignableUsers{
             totalCount
            }
            licenseInfo{
             key
            }
            defaultBranchRef{
             target{
              ... on Commit{
               history(first:2){
                totalCount
                edges{
                 node{
                  ... on Commit{
                   committedDate
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