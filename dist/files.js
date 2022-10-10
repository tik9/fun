"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
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
  }`;
const handler = async (event) => {
    var expression = "main:public/" + event.queryStringParameters.dir;
    var options = {
        url: process.env.gh_graph,
        method: 'post',
        data: { query: query_file, variables: { expression } },
        headers: { 'Authorization': `Bearer ${process.env.ghtoken}`, },
    };
    try {
        var res = (await axios_1.default.request(options)).data;
    }
    catch (error) {
        console.log(error);
    }
    return {
        statusCode: 200,
        body: JSON.stringify(res.data.repository)
    };
};
exports.handler = handler;
