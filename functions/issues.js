
import axios from "axios";

var query_issue = `
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

export const handler = async (event) => {
  var params = event.queryStringParameters
  var query = params.para1 == 'issues' ? query_issue : query_file

  var options = {
    url: process.env.gh_graph,
    method: 'post',
    data: { query: query_issue },
    headers: { 'Authorization': `Bearer ${process.env.ghtoken}`, },
  };
  try {
    var res = (await axios.request(options)).data
  } catch (error) { console.log(error) }

  return {
    statusCode: 200,
    body: JSON.stringify(res.data.repository)
  }
}