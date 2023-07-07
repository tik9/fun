
import { getHelp } from "./graphquery";
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  var repo = event.queryStringParameters!.repo
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
  var res = (await getHelp(query)).data.repository.issues.edges
  // console.log(res)
  return { statusCode: 200, body: JSON.stringify(res) }
}