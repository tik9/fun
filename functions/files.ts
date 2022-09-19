
import axios from "axios";
import { Handler } from "@netlify/functions";

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

export const handler: Handler = async (event) => {
  var expression = "main:public/" + event.queryStringParameters!.dir

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