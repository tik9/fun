
import axios from "axios";

var query_issue = `
  query {
    repository(owner:"tik9", name:"fun") {
      issues(last:3) {
       totalCount,
        edges {
          node {
            createdAt
              body
              title
              url
          }
        }
      }
    }
  }`;

var query_file = `query {
    repository(owner:"tik9", name:"fun") {
        object(expression: "main:public/js") {
        ... on Tree{
          entries{
            name
            size
          }
        }
      }
    } 
  }`

export const handler = async (event) => {
    var params = event.queryStringParameters
    var query = params.para1 == 'issues' ? query_issue : query_file

    var options = {
        url: 'https://api.github.com/graphql',
        method: 'POST',
        data: JSON.stringify({ query }),
        headers: { 'Authorization': `Bearer ${process.env.ghtoken}`, },
    };
    var res = (await axios.request(options)).data

    return {
        statusCode: 200,
        body: JSON.stringify(res.data.repository)
    }
}