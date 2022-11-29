"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
async function handler() {
    let arr = [];
    for (var elem of ['posts', 'comments']) {
        var res = (await axios_1.default.get('https://api.stackexchange.com/2.2/users/1705829/' + elem + '?site=stackoverflow&sort=votes&filter=withbody')).data.items.slice(0, 3);
        res = res.map(({ body: text, creation_date: date, post_id, score }) => ({
            date: new Date(date * 1000).toISOString().substring(0, 10),
            text: (0, utils_1.truncate)(text, 100),
            url: 'https://stackoverflow.com/questions/' + post_id,
            score,
            type: elem.slice(0, -1)
        }));
        arr.push(res);
    }
    arr = arr.flat();
    arr.sort((a, b) => a.score < b.score ? 1 : a.score > b.score ? -1 : 0);
    // console.log(arr)
    return {
        body: JSON.stringify(arr),
        statusCode: 200
    };
}
exports.handler = handler;
