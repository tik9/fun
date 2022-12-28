"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const graphquery_1 = require("./graphquery");
//@ts-ignore
var handler = async () => {
    var description = 'show my cv';
    var url = 'https://ticv.netlify.app';
    var res = await (0, graphquery_1.getOneRepo)('cv2');
    //@ts-ignore
    var id = res.data.repository.id;
    // console.log(1, id)
    var query = `mutation {updateRepository(input: { clientMutationId: "tik9", description: "${description}", repositoryId: "${id}",homepageUrl:"${url}" }) {clientMutationId repository{name description } }}`;
    // query = `mutation {createRepository(input: {name: "te",visibility: PUBLIC}) {repository {url}}}`
    //@ts-ignore
    res = await (0, graphquery_1.axiosHelp)(query);
    console.log(1, query);
    return { statusCode: 200, body: res };
};
exports.handler = handler;
