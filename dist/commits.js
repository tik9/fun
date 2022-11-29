"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const graphquery_1 = require("./graphquery");
var handler = async (event) => {
    var repo = event.queryStringParameters.repo;
    // var res = await commits(repo!)
    // }
    // async function commits(repo: string) {
    var query = `query {
    repository(owner: "tik9", name: "${repo}") {
      refs(refPrefix: "refs/heads/", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 2) {
        edges {
          node {
            ... on Ref {
              name
              target {
                ... on Commit {
                  history(first: 4) {
                    edges {
                      node {
                        ... on Commit {
                          committedDate
                          message
                          commitUrl
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
    //@ts-ignore
    var res = (await (0, graphquery_1.axiosHelp)(query)).data.repository.refs.edges[0].node.target.history.edges;
    return { statusCode: 200, body: JSON.stringify(res) };
};
exports.handler = handler;
