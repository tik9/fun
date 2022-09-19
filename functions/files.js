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
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var expression = "main:public/" + event.queryStringParameters.dir;
    var options = {
        url: process.env.gh_graph,
        method: 'post',
        data: { query: query_file, variables: { expression } },
        headers: { 'Authorization': `Bearer ${process.env.ghtoken}`, },
    };
    try {
        var res = (yield axios_1.default.request(options)).data;
    }
    catch (error) {
        console.log(error);
    }
    return {
        statusCode: 200,
        body: JSON.stringify(res.data.repository)
    };
});
exports.handler = handler;
