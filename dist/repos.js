"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const graphquery_1 = require("./graphquery");
const handler = async () => {
    var query = `query{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 4) { nodes { id name description homepageUrl pushedAt }}}}`;
    var res = await (0, graphquery_1.axiosHelp)(query);
    //@ts-ignore
    res = res.data.repositoryOwner.repositories.nodes;
    //@ts-ignore
    res = res.map(({ homepageUrl: url, pushedAt, ...rest }) => ({ date: pushedAt.substring(0, 10), url, ...rest }));
    console.log(1, res);
    return { statusCode: 200, body: JSON.stringify(res) };
};
exports.handler = handler;
