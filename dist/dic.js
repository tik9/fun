"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dic2 = exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var id = "f6aa0186";
function helper(res) {
    var lex_entry = res.results[0].lexicalEntries[0];
    var definition = lex_entry.entries[0].senses[0].definitions[0];
    var phrases = lex_entry.phrases[0].text;
    return { def: definition, phr: phrases };
}
const handler = async (event) => {
    var Dictionary = require("oxford-dictionaries-api");
    var dict = new Dictionary(id, process.env.oxford);
    var res = await dict.entries({ word_id: event.queryStringParameters.word });
    return {
        statusCode: 200,
        body: JSON.stringify(helper(res))
    };
};
exports.handler = handler;
async function dic2(word) {
    const options = {
        url: 'https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/' + word,
        headers: {
            'app_id': id,
            'app_key': process.env.oxford
        }
    };
    var res = await axios_1.default.request(options);
    // console.log(res.data)
    console.log(helper(res.data));
}
exports.dic2 = dic2;
