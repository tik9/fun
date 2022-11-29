"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const graphquery_1 = require("./graphquery");
const handler = async () => {
    var query = `query{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 4) { nodes { name description homepageUrl pushedAt }}}}`;
    var res = await (0, graphquery_1.axiosHelp)(query);
    // console.log(1, res,)
    //@ts-ignore
    res = res.data.repositoryOwner.repositories.nodes;
    //@ts-ignore
    res = res.map(({ name: repo, description, homepageUrl: url, pushedAt, ...rest }) => ({ repo, description, date: pushedAt.substring(0, 10), url, ...rest }));
    return { statusCode: 200, body: JSON.stringify(res) };
};
exports.handler = handler;
