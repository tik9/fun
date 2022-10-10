"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
var query = `
  query {
    repository(owner:"tik9", name:"fun") {
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
const handler = async () => {
    var options = {
        url: process.env.gh_graph,
        method: 'post',
        data: { query: query },
        headers: { 'Authorization': `Bearer ${process.env.ghtoken}`, },
    };
    var res = (await axios_1.default.request(options)).data.data.repository.issues.edges;
    // console.log(res)
    return {
        statusCode: 200,
        body: JSON.stringify(res)
    };
};
exports.handler = handler;
