
import { axiosHelp } from "./query";
import { Handler } from "@netlify/functions";

var query = `query($vars: String) {
    repository(owner:"tik9", name:"fun") {
        object(expression:$vars ) {
        ... on Tree{
          entries{
            name
          }
        }
      }
    } 
  }`

export const handler: Handler = async (event) => {

  var dir = event.queryStringParameters!.dir
  try {
    var res = await axiosHelp(query, "main:public/" + dir)
  } catch (error) { console.log(error) }

  return {
    statusCode: 200,
    body: JSON.stringify(res.data.repository)
  }
}