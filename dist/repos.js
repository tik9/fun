"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
var url = 'https://api.github.com/graphql';
const handler = async () => {
    var query = `{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 4) { nodes { name description homepageUrl pushedAt }}}}`;
    var res = (await axios_1.default.request({
        url: url,
        method: 'POST',
        headers: { "Authorization": "bearer " + process.env.ghtoken, },
        data: JSON.stringify({ query })
    })).data;
    res = res.data.repositoryOwner.repositories.nodes;
    res = res.map(({ name: repo, description, homepageUrl: url, pushedAt, ...rest }) => ({ repo, description, date: pushedAt.substring(0, 10), url, ...rest }));
    // console.log(res)
    return { statusCode: 200, body: JSON.stringify(res) };
};
exports.handler = handler;
