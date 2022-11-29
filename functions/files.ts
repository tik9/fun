
import { axiosHelp } from "./graphquery";
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
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
  var dir = event.queryStringParameters!.dir
  var res
  try {
    res = await axiosHelp(query, "main:public/" + dir)
    // console.log(1, res)
  } catch (error) { console.log(error) }
  return {
    statusCode: 200,
    //@ts-ignore
    body: JSON.stringify(res.data.repository)
  }
}