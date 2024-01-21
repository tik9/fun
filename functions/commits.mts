
import { getGhGraph } from './graph.mjs';
import { promises as fs } from 'fs'
import { resolve } from 'path'

var script = __filename.split(__dirname + "/").pop()?.split('.')[0]
var json = resolve('public', `json/${script}.json`)

export default async (req: Request) => {
  // var repo = new URL(req.url).searchParams.get('repo')

  if (new URL(req.url).searchParams.get('save')) {
    getCommits()
  }
  return new Response(await fs.readFile(json, 'utf-8'))

}

async function getCommits() {
  var repo = 'fun'
  var query = `query {
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

  fs.writeFile(json, JSON.stringify((await getGhGraph(query)).data.repository.refs.edges[0].node.target.history.edges))
}