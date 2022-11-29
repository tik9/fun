"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const graphquery_1 = require("./graphquery");
const handler = async (event) => {
    var repo = event.queryStringParameters.repo;
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
    //@ts-ignore
    var res = (await (0, graphquery_1.axiosHelp)(query)).data.repository.issues.edges;
    return { statusCode: 200, body: JSON.stringify(res) };
};
exports.handler = handler;
