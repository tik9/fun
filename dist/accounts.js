"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
var handler = async () => {
    var cloud_arr = [
        { name: "stack", url: 'http://api.stackexchange.com/2.2/users/1705829?site=stackoverflow', link: 'link' },
        { name: "git", url: 'http://api.github.com/users/tik9', link: 'html_url' }
    ];
    var obj = {};
    for (var elem of cloud_arr) {
        var res = (await axios_1.default.get(elem.url)).data;
        let name = elem.name;
        if (name == 'stack')
            res = res.items[0];
        obj[name] = res[elem.link];
    }
    return { statusCode: 200, body: JSON.stringify(obj) };
};
exports.handler = handler;
