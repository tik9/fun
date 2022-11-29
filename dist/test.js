"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rate_limit = exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
var handler = async () => {
    var res;
    console.log(1, await rate_limit(), 2, await repos());
    return { statusCode: 200, body: res };
};
exports.handler = handler;
async function repos() {
    //@ts-ignore
    return ((await axios_1.default.get('https://api.github.com/users/tik9/repos')).data).slice(0, 3).map(obj => ({ repo: obj.name, description: obj.description, update: obj.updated_at.slice(0, 10), url: obj.html_url }));
}
exports.default = repos;
async function rate_limit() {
    var url = 'https://api.github.com/rate_limit';
    try {
        var res = (await axios_1.default.get(url)).data;
    }
    catch (error) {
        console.log('err');
    }
    return res.resources.core;
}
exports.rate_limit = rate_limit;
async function dic() {
    var Dictionary = require("oxford-dictionaries-api");
    var dict = new Dictionary("f6aa0186", process.env.oxford);
    var res = await dict.entries({ word_id: 'ace' });
    var lex_entry = res.results[0].lexicalEntries[0];
    var definition = lex_entry.entries[0].senses[0].definitions[0];
    var phrases = lex_entry.phrases[0].text;
}
