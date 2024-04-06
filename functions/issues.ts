
import { getGhGraph, locale_date } from "./utils";

import { resolve } from "path";
import { promises as fs } from "fs";

var script = __filename.split(__dirname + "/").pop()?.split('.')[0]
var json = resolve('public', 'json', `${script}.json`)

export default async (req: Request) => {
  if (new URL(req.url).searchParams.get('save'))
    // await getRepoIssues
    await getAllIssues()
  return new Response((await fs.readFile(json, 'utf-8')))
}
let user = "tik9"
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
                  repository {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
}`
  let res = (await getGhGraph(query, { "user": user })).data.user.repositories.edges

  // res=res[0].node.issues.edges
  console.log(res)

  // res = res.map(elem => ({ date: elem.node.createdAt, title: elem.node.title, text: elem.node.body, url: elem.node.url, repo: elem.node.repository }))
  // res = res.map(elem => ({ date: new Date(elem.node.createdAt).toLocaleDateString('de-de', { year: 'numeric', day: '2-digit', month: '2-digit' }), title: elem.node.title, text: elem.node.body, url: elem.node.url, repo: elem.node.repository }))

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
            body
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

  res = res.map(elem => ({ date: new Date(elem.node.updatedAt).toLocaleDateString('de-de', { year: 'numeric', day: '2-digit', month: '2-digit' }), title: elem.node.title, text: elem.node.body, url: elem.node.url, }))
  fs.writeFile(json, JSON.stringify(res))
}