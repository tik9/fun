"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rate = exports.handler = void 0;
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
async function repos() {
    var res = ((await axios_1.default.get('https://api.github.com/users/tik9/repos')).data).slice(0, 3);
    //@ts-ignore
    res = res.map(obj => ({ repo: obj.name, description: obj.description, update: obj.updated_at.slice(0, 10), url: obj.html_url }));
    return res;
}
exports.default = repos;
async function rate() {
    var gh_url = 'https://api.github.com/rate_limit';
    try {
        var res = (await axios_1.default.get(gh_url)).data;
    }
    catch (error) {
        console.log('err');
    }
    console.log(res.resources.core);
}
exports.rate = rate;
