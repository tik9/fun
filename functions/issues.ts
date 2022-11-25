
import { axiosHelp } from "./query";
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  var repo = event.queryStringParameters!.repo
  var res = await issues(repo!)
  console.log(res, repo)
  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
}

async function issues(repo: string) {
  var query = `
  query {
    repository(owner:"tik9", name:"${repo}") {
      issues(last:3) {
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
  return (await axiosHelp(query)).data.repository.issues.edges
}