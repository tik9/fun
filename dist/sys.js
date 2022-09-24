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
const node_child_process_1 = require("node:child_process");
const node_ipinfo_1 = require("node-ipinfo");
const os_1 = __importDefault(require("os"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let url = process.env.URL + '/.netlify/functions/';
    let url_utils = url + 'utils?';
    let url_mongo = url + 'mongo';
    var server = {
        architecture: os_1.default.arch(),
        cores: os_1.default.cpus().length.toString(),
        date: new Date().toISOString().slice(0, 10),
        'free memory': (yield axios_1.default.get(url_utils + 'fun=bytes&param=' + os_1.default.freemem())).data,
        host_server: (yield axios_1.default.post(url_utils, { body: { key: os_1.default.hostname(), length: 15 } })).data,
        'memory': (yield axios_1.default.get(url_utils + 'fun=bytes&param=' + os_1.default.totalmem())).data,
        "node": process.versions.node.split(".")[0],
        "npm": yield execPromise('npm -v'),
        'os': (yield axios_1.default.post(url_utils, {
            body: { key: os_1.default.version(), length: 30 }
        })).data,
        platform: os_1.default.platform(),
        release: os_1.default.release(),
        'speed cpu mhz': os_1.default.cpus()[0].speed.toString(),
    };
    const ipinfo = new node_ipinfo_1.IPinfoWrapper(process.env.ipgeo);
    var client = (yield axios_1.default.get("https://ipinfo.io/json?token=" + process.env.ipgeo)).data;
    client.client_map = (yield ipinfo.getMap([client.ip])).reportUrl;
    client.tik = 2;
    var res = Object.assign(Object.assign({}, server), client);
    if (event.headers.host != 'localhost') {
        yield axios_1.default.post(url_mongo, { body: { coll: 'sys', val: res } });
    }
    return { statusCode: 200, body: JSON.stringify(res) };
});
exports.handler = handler;
function execPromise(command) {
    return new Promise((resolve, reject) => {
        (0, node_child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}
