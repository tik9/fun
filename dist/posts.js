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
const utils_1 = require("./utils");
function handler() {
    return __awaiter(this, void 0, void 0, function* () {
        let url_utils = process.env.URL + '/.netlify/functions/utils';
        var res = (yield axios_1.default.get('https://api.stackexchange.com/2.2/users/1705829/comments?site=stackoverflow&filter=withbody')).data;
        res = res.items.slice(0, 2);
        res = res.map(({ creation_date: date, body: text }) => ({
            date: new Date(date * 1000).toISOString().substring(0, 10),
            text: (0, utils_1.truncate)(text, 100),
            url: 'https://stackexchange.com/users/1886776/timo?tab=activity',
        }));
        // res = await Promise.all(res.map())
        console.log(1, res);
        return {
            body: JSON.stringify(res),
            statusCode: 200
        };
    });
}
exports.handler = handler;
