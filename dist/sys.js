"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const utils_1 = require("./utils");
const utils_2 = require("./utils");
const mongo_1 = require("./mongo");
const node_ipinfo_1 = require("node-ipinfo");
const os_1 = __importDefault(require("os"));
const handler = async (event) => {
    var server = {
        architecture: os_1.default.arch(),
        cores: os_1.default.cpus().length.toString(),
        'free memory': (0, utils_2.format_bytes)(os_1.default.freemem()),
        // host: event.headers.host,
        // host_server: truncate(os.hostname(), 15),
        'total memory': (0, utils_2.format_bytes)(os_1.default.totalmem()),
        "node version": process.versions.node.split(".")[0],
        'os version': os_1.default.version(),
        platform: os_1.default.platform(),
        'os release': os_1.default.release(),
        'speed cpu mhz': os_1.default.cpus()[0].speed.toString(),
    };
    var ipinfo = await (await (0, node_fetch_1.default)("https://ipinfo.io/json?token=" + process.env.ipgeo)).json();
    console.log(1, ipinfo);
    //@ts-ignore
    ipinfo['server location'] = (await (new node_ipinfo_1.IPinfoWrapper(process.env.ipgeo)).getMap([ipinfo.ip])).reportUrl;
    //@ts-ignore
    var new_arr = ['ip', 'loc', 'org', 'postal'].forEach(element => { delete ipinfo[element]; });
    //@ts-ignore
    ipinfo = (0, utils_1.renameKeys)({ city: 'region city', country: 'region country', timezone: 'server timezone' }, ipinfo);
    //@ts-ignore
    var res = { ...server, ...ipinfo };
    if (event.headers.host != 'localhost') {
        res['server date'] = (0, utils_1.datetime)(new Date());
        (0, mongo_1.insert_one)('sys', res);
    }
    return {
        headers: { 'access-control-allow-origin': '*' },
        statusCode: 200, body: JSON.stringify(res)
    };
};
exports.handler = handler;
