
import { getGhGraph } from './utils';
import { promises as fs } from 'fs'
import { resolve } from 'path'

var script = __filename.split(__dirname + "/").pop()?.split('.')[0]
var json = resolve('public', `json/${script}.json`)

export default async (req: Request) => {
  // console.log(1, new URL(req.url).searchParams.get('save'))
  if (new URL(req.url).searchParams.get('save'))
    await getCommits()
  // console.log(2)
  return new Response(await fs.readFile(json, 'utf-8'))

}

async function getCommits() {
  let repo = 'fun'
  let query = `query {
    repository(owner: "tik9", name: "${repo}") {
      refs(refPrefix: "refs/heads/", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 2) {
        edges {
          node {
            ... on Ref {
              name
              target {
                ... on Commit {
                  history(first: 4) {
                    edges {
                      node {
                        ... on Commit {
                          committedDate
                          message
                          commitUrl
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

  // console.log(12)
  let res = await getGhGraph(query)
  fs.writeFile(json, JSON.stringify(res.data.repository.refs.edges[0].node.target.history.edges))
}