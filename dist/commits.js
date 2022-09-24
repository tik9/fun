"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var handler = () => __awaiter(void 0, void 0, void 0, function* () {
    var res;
    // try {
    res = (yield axios_1.default.request({ url: process.env.gh_graph, method: 'POST', headers: { "Authorization": "bearer " + process.env.ghtoken, }, data: JSON.stringify({ query }) })).data;
    res = res.data.repository.refs.edges[0].node.target.history.edges;
    // console.log(1, res)
    // mongo.truncate_coll(commits);
    // await mongo.insert_val(commits, res);
    // var res = await mongo.count(commits)
    return { statusCode: 200, body: JSON.stringify(res) };
    // } catch (error) { console.log(error); }
});
exports.handler = handler;
