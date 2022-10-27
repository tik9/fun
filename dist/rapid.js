"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const handler = async (event) => {
    var url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    var method = 'post';
    var input, body;
    if (typeof (event.queryStringParameters.input) != 'undefined') {
        input = event.queryStringParameters.input;
        url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search';
        method = 'get';
    }
    else
        body = { target: "de", q: JSON.parse(event.body).q };
    const options = {
        method: method,
        url: url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': process.env.rapid
        },
        params: { query: input },
        data: qs_1.default.stringify(body)
    };
    var res;
    try {
        res = (await axios_1.default.request(options)).data;
    }
    catch (error) {
        console.log(1, error);
    }
    return { statusCode: 200, body: JSON.stringify(res) };
};
exports.handler = handler;
