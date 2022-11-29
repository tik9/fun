"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const graphquery_1 = require("./graphquery");
var handler = async () => {
    var description = 'Old cv and motivation html creation from markdown';
    var url = '';
    var repo = await (0, graphquery_1.getOneRepo)('cv');
    //@ts-ignore
    var id = repo.id;
    // var query = `mutation {updateRepository(input: { clientMutationId: "tik9", description: "${description}", repositoryId: "${id}",homepageUrl:"${url}" }) {clientMutationId repository{name description } }}`
    // query = `mutation {createRepository(input: {name: "gh-create-test", ownerId:"idobtainedabove"}) {repository {url}}}`
    var res;
    // res = await axiosHelp(query)
    console.log(1, id, 2, res);
    return { statusCode: 200, body: res };
};
exports.handler = handler;
