"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const graphquery_1 = require("./graphquery");
//@ts-ignore
var handler = async () => {
    var description = 'github repos info | SO posts';
    var url = 'https://tiremaster.gatsbyjs.io';
    var res = await (0, graphquery_1.getOneRepo)('repos');
    //@ts-ignore
    var id = res.data.repository.id;
    var query;
    query = `mutation {updateRepository(input: { clientMutationId: "tik9", description: "${description}", repositoryId: "${id}",homepageUrl:"${url}" }) {clientMutationId repository{name description } }}`;
    // query = `mutation {createRepository(input: {name: "te",visibility: PUBLIC}) {repository {url}}}`
    res = await (0, graphquery_1.axiosHelp)(query);
    console.log(1, id, 2, query);
    return { statusCode: 200, body: res };
};
exports.handler = handler;
