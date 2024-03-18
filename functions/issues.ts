
import { getGhGraph, locale_date } from "./utils";

import { resolve } from "path";
import { promises as fs } from "fs";

var script = __filename.split(__dirname + "/").pop()?.split('.')[0]
var json = resolve('public', 'json', `${script}.json`)

export default async (req: Request) => {
  var repo = 'fun'
  var query = `
  query {
    repository(owner:"tik9", name:"${repo}") {
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

  let res
  if (new URL(req.url).searchParams.get('save')) {
    res = (await getGhGraph(query)).data.repository.issues.edges
    res = res.map(elem => ({ date: new Date(elem.node.updatedAt).toLocaleDateString('de-de', { year: 'numeric', day: '2-digit', month: '2-digit' }), title: elem.node.title, text: elem.node.body, url: elem.node.url, }))
    fs.writeFile(json, JSON.stringify(res))
  }

  return new Response((await fs.readFile(json, 'utf-8')))
}