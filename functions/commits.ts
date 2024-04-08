
import { getGhGraph } from './utils';
import { promises as fs } from 'fs'
import { resolve } from 'path'

var script = __filename.split(__dirname + "/").pop()?.split('.')[0]
var json = resolve('public', `json/${script}.json`)

export default async (req: Request) => {
  if (new URL(req.url).searchParams.get('save'))
    // await getRepoCommits()
    await getAllCommits()
  return new Response(await fs.readFile(json, 'utf-8'))

}

async function getAllCommits() {
  let query = `query (
    $cursorRepo: String,
    $cursorCommit: String,
    $user: String = "tik9",
    $emails: [String!] = ["user153015@gmail.com"]
  ) {
    user(login: $user) {
      repositoriesContributedTo(
        includeUserRepositories: true
        contributionTypes: COMMIT
        first: 10
        after: $cursorRepo
      ) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          name
          defaultBranchRef {
            target {
              ... on Commit {
                history(author: {emails: $emails}, after: $cursorCommit) {
                  totalCount
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                  nodes {
                    ... on Commit {
                      oid
                      messageHeadline
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
  }`

  let res = (await getGhGraph(query)).data.user.repositoriesContributedTo
  // nodes[0].defaultBranchRef.target
  console.log(res)

}

async function getRepoCommits() {
  let repo = 'fun'
  let query = `query {
    repository(owner: "tik9", name: "${repo}") {
      refs(refPrefix: "refs/heads/", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 1) {
        edges {
          node {
            ... on Ref {
              name
              target {
                ... on Commit {
                  history(first: 3) {
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

  let res = (await getGhGraph(query)).data.repository.refs.edges[0].node.target.history.edges
  res = res.map(elem => ({ date: new Date(elem.node.committedDate).toLocaleDateString('de-de', { year: "numeric", day: "2-digit", month: "2-digit" }), message: elem.node.message, url: elem.node.commitUrl }))
  console.log(res)
  fs.writeFile(json, JSON.stringify(res))
}