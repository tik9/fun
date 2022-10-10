"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
var query = `{
    repository(owner: "tik9", name: "fun") {
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
var handler = async () => {
    var res;
    // try {
    res = (await axios_1.default.request({ url: process.env.gh_graph, method: 'POST', headers: { "Authorization": "bearer " + process.env.ghtoken, }, data: JSON.stringify({ query }) })).data;
    res = res.data.repository.refs.edges[0].node.target.history.edges;
    // console.log(1, res)
    // mongo.truncate_coll(commits);
    // await mongo.insert_val(commits, res);
    // var res = await mongo.count(commits)
    return { statusCode: 200, body: JSON.stringify(res) };
    // } catch (error) { console.log(error); }
};
exports.handler = handler;
