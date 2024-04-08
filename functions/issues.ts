
import { getGhGraph, locale_date } from "./utils";

import { resolve } from "path";
import { promises as fs } from "fs";

var script = __filename.split(__dirname + "/").pop()?.split('.')[0]
var json = resolve('public', 'json', `${script}.json`)

let user = "tik9"

export default async (req: Request) => {
  if (new URL(req.url).searchParams.get('save'))
    // await getRepoIssues
    await getAllIssues()

  return new Response(await fs.readFile(json, 'utf-8'))
}

async function getAllIssues() {
  let query = `query($user: String!) {
    user(login: $user) {
      repositories(affiliations: [OWNER], last: 3) {
        edges {
          node {
            issues(states: [OPEN], last: 7) {
              edges {
                node {
                  createdAt
                  title
                  url
                  body
                }
              }
            }
          }
        }
      }
    }
}`

  let res = (await getGhGraph(query, { "user": user })).data.user.repositories.edges

  // let res = JSON.parse(await fs.readFile(json, 'utf-8'))

  res = res.map(elem => elem.node.issues.edges.map(elem => elem.node)).map(elem => (elem.map(({ repository, createdAt, ...elem }) => ({ date: new Date(createdAt).toLocaleDateString('de-de', { year: 'numeric', day: '2-digit', month: '2-digit' }), ...elem })))).filter(item => item.length)

  if (res[1] === undefined) res = res.flat()

  for (let elem of res) {
    if (elem.body === '') delete elem.body
  }

  fs.writeFile(json, JSON.stringify(res))
}

async function getRepoIssues() {
  let repo = 'fun'
  let query = `
  query {
    repository(owner:${user}, name:"${repo}") {
      issues(states: [OPEN],orderBy: { field: UPDATED_AT, direction: DESC },first:3) {
       totalCount,
        edges {
          node {
            updatedAt
            title
            url
            comments(first: 3) {
              edges {
                node {
                  body
                }
              }
            }
          }
        }
      }
    }
  }`;
  let res = (await getGhGraph(query)).data.repository.issues.edges

  res = res.map(elem => ({ date: new Date(elem.node.updatedAt).toLocaleDateString('de-de', { year: 'numeric', day: '2-digit', month: '2-digit' }), title: elem.node.title, url: elem.node.url, comments: elem.node.comments }))
  fs.writeFile(json, JSON.stringify(res))
}