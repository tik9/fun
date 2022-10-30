"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const node_child_process_1 = require("node:child_process");
const utils_1 = require("./utils");
const mongo_1 = require("./mongo");
const node_ipinfo_1 = require("node-ipinfo");
const os_1 = __importDefault(require("os"));
const handler = async (event) => {
    var server = {
        architecture: os_1.default.arch(),
        cores: os_1.default.cpus().length.toString(),
        date: new Date().toISOString().slice(0, 10),
        'free memory': (0, utils_1.format_bytes)(os_1.default.freemem()),
        host: event.headers.host,
        host_server: (0, utils_1.truncate)(os_1.default.hostname(), 15),
        'memory': (0, utils_1.format_bytes)(os_1.default.totalmem()),
        "node": process.versions.node.split(".")[0],
        'os': (0, utils_1.truncate)(os_1.default.version(), 30),
        platform: os_1.default.platform(),
        release: os_1.default.release(),
        'speed cpu mhz': os_1.default.cpus()[0].speed.toString(),
        npm_version: ''
    };
    if (event.headers.host == 'localhost')
        server.npm_version = await execPromise('npm -v');
    const ipinfo = new node_ipinfo_1.IPinfoWrapper(process.env.ipgeo);
    var client = (await axios_1.default.get("https://ipinfo.io/json?token=" + process.env.ipgeo)).data;
    var new_arr = ['loc', 'org', 'postal'].forEach(element => { delete client[element]; });
    client.map = (await ipinfo.getMap([client.ip])).reportUrl;
    const server_sorted = Object.keys(server).sort().reduce((r, k) => ({ ...r, [k]: server[k] }), {});
    var res = { ...server_sorted, ...client };
    if (event.headers.host != 'localhost')
        (0, mongo_1.insert_one)('sys', res);
    // console.log(res)
    return {
        headers: { 'access-control-allow-orgigin': '*' },
        statusCode: 200, body: JSON.stringify(res)
    };
};
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
