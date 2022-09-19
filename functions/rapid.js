"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var res;
    var params = event.queryStringParameters;
    params = (Object.keys(params).length !== 0) ? params : { type: 'joke', input: 'abc' };
    var url;
    if (params.type == 'joke')
        url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search';
    else
        url = 'https://alpha-vantage.p.rapidapi.com/query';
    var res = (yield axios_1.default.request({
        method: 'get',
        url: url,
        params: {
            query: params.input,
            function: 'time_series_monthly',
            symbol: params.input,
            interval: '5min'
        },
        headers: { 'x-rapidapi-key': process.env.rapid }
    })).data;
    return { statusCode: 200, body: JSON.stringify(res) };
});
exports.handler = handler;
