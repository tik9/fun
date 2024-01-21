
import { getGhGraph } from "./graph.mjs";

export default async (req: Request) => {
  var repo = 'fun'
  var query = `
  query {
    repository(owner:"tik9", name:"${repo}") {
      issues(orderBy: { field: UPDATED_AT, direction: DESC },first:3) {
       totalCount,
        edges {
          node {
            state
            updatedAt
              body
              title
              url
          }
        }
      }
    }
  }`;
  //@ts-ignore
  var res = (await getGhGraph(query)).data.repository.issues.edges
  // console.log(res)
  return { statusCode: 200, body: JSON.stringify(res) }
}