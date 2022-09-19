
import axios from "axios";

var query = `
  query {
    repository(owner:"tik9", name:"fun") {
      issues(last:3) {
       totalCount,
        edges {
          node {
            createdAt
            updatedAt
              body
              title
              url
          }
        }
      }
    }
  }`;

export const handler = async () => {
  var options = {
    url: process.env.gh_graph,
    method: 'post',
    data: { query: query },
    headers: { 'Authorization': `Bearer ${process.env.ghtoken}`, },
  };
  var res = (await axios.request(options)).data.data.repository.issues.edges

  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
}