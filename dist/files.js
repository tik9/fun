"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const graphquery_1 = require("./graphquery");
const handler = async (event) => {
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
  }`;
    var dir = event.queryStringParameters.dir;
    var res;
    try {
        res = await (0, graphquery_1.axiosHelp)(query, "main:public/" + dir);
        // console.log(1, res)
    }
    catch (error) {
        console.log(error);
    }
    return {
        statusCode: 200,
        //@ts-ignore
        body: JSON.stringify(res.data.repository)
    };
};
exports.handler = handler;
