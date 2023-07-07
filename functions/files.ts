
import { getHelp } from "./graphquery";
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {

  const queryParameter = event.queryStringParameters!

  var res
  if (queryParameter.dir) {
    res = readRepo(queryParameter!.dir)
  }
  else {
    console.log('no dir param')
  }
  return {
    statusCode: 200, body: JSON.stringify(res)
  }
}


async function readRepo(queryParameter: string) {
  var res
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

  try {
    res = await getHelp(query, "main:public/" + queryParameter)
    //@ts-ignore
    return res.data.repository
    // console.log(1, res)
  } catch (error) { console.log(error) }
}
