
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

var query_file = `query file($expression: String) {
    repository(owner:"tik9", name:"fun") {
        object(expression:$expression ) {
        ... on Tree{
          entries{
            name
          }
        }
      }
    } 
  }`
// query_file = `query ($expression:String){repository(owner:"google", name:"gson") {object(expression: $expression) {... on Tree{entries{name         }   }}} }`

// var expression = "gson-2.4:gson"

export const handler = async (event) => {
  var params = event.queryStringParameters

  var expression = "main:public/" + params.dir

  var options = {
    url: process.env.gh_graph,
    method: 'post',
    data: { query: query_file, variables: { expression } },
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