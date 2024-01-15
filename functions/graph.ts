
export default async (req: Request) => {
    return new Response((await getOneRepo(new URL(req.url).searchParams.get('repo'))).data.repository.description)
}

export async function getHelp(query: string, vars: string = '') {
    // console.log(1, vars, query)
    return await (await fetch('https://api.github.com/graphql', { method: 'POST', headers: { "Authorization": "bearer " + process.env.ghtoken }, body: JSON.stringify({ query: query, variables: { vars } }) })).json()
}

export async function getOneRepo(repo: any) {
    var query = `query {repository (name:"${repo}" , owner: "tik9")  {id name description homepageUrl}}`;

    // query = `query{repositoryOwner(login: "tik9"){id login repositories(first: 1) { edges {node {id name}}}}}`
    return await getHelp(query)
    // console.log(res.data.repositoryOwner.repositories.edges)
    // console.log(1, res.data.repository.id)
}

async function rate() {
    return await getHelp(`query {viewer {login}rateLimit {limit remaining resetAt}}`)
}