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
const node_ipinfo_1 = require("node-ipinfo");
const os_1 = require("os");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var res;
    const ipinfo = new node_ipinfo_1.IPinfoWrapper(process.env.ipgeo);
    res = (yield axios_1.default.get("https://ipinfo.io/json?token=" + process.env.ipgeo)).data;
    res.map = (yield ipinfo.getMap([res.ip])).reportUrl;
    res.date = new Date().toISOString().substring(0, 10);
    res.host_name = (0, os_1.hostname)().slice(0, 10);
    res.tik = 2;
    // console.log(1, event.headers.host);
    // if (event.headers.host != 'localhost') {
    yield axios_1.default.post(process.env.URL + '/.netlify/functions/mongo', { body: { coll: 'client', val: [res] } });
    // }
    return { body: JSON.stringify(res), statusCode: 200 };
});
exports.handler = handler;
