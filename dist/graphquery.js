"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneRepo = exports.axiosHelp = exports.handler = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
var handler = async () => {
    var res;
    console.log(1, await getOneRepo('cv'));
    return { statusCode: 200, body: res };
};
exports.handler = handler;
async function axiosHelp(query, vars = '') {
    // console.log(1, vars, query)
    var res = (await (0, node_fetch_1.default)('https://api.github.com/graphql', { method: 'POST', headers: { "Authorization": "bearer " + process.env.ghtoken }, body: JSON.stringify({ query: query, variables: { vars } }) })).json();
    return res;
}
exports.axiosHelp = axiosHelp;
async function getOneRepo(repo = 'custom') {
    var query = `query {repository (name:"${repo}" , owner: "tik9")  {id description homepageUrl}}`;
    query = `query{repositoryOwner(login: "tik9"){id login repositories(first: 1) { edges {node {id}}}}}`;
    var res = (await axiosHelp(query));
    console.log(2, res, query);
    return res;
}
exports.getOneRepo = getOneRepo;
