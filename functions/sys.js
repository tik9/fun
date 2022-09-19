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
const os_1 = __importDefault(require("os"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let url = process.env.URL + '/.netlify/functions/';
    let url_utils = url + 'utils?';
    let url_mongo = url + 'mongo';
    var sys = [
        {
            "info": "npm version",
            "value": yield execPromise('npm -v'),
            "category": "node"
        },
        {
            "info": "architecture",
            "value": os_1.default.arch(),
            "category": "hardware"
        },
        {
            "info": 'os version',
            "value": url_utils + 'truncate&param=' + os_1.default.version() + 'length=30',
            "category": "os"
        },
        {
            "info": "platform",
            "value": os_1.default.platform(),
            "category": "os"
        },
        {
            "info": "release",
            "value": os_1.default.release(),
            "category": "os"
        },
        {
            "info": "cores",
            "value": os_1.default.cpus().length.toString(),
            "category": "hardware"
        },
        {
            "info": 'speed cpu mhz',
            "value": os_1.default.cpus()[0].speed.toString(),
            "category": "hardware"
        },
        {
            "info": 'total memory',
            "value": (yield axios_1.default.get(url_utils + 'fun=bytes&param=' + os_1.default.totalmem())).data,
            "category": "hardware"
        },
        {
            "info": 'free memory',
            "value": (yield axios_1.default.get(url_utils + 'fun=bytes&param=' + os_1.default.freemem())).data,
            "category": "hardware"
        },
        {
            "info": "node version",
            "value": process.versions.node.split(".")[0],
            "category": "node"
        },
    ];
    for (var elem of sys) {
        elem.date = new Date().toISOString().slice(0, 10);
        elem.host = (yield axios_1.default.get(url_utils + 'fun=truncate&param=' + os_1.default.hostname() + '&length=13')).data;
    }
    console.log(sys);
    // sys.sort(utils.sort('category'))
    if (event.headers.host != 'localhost:80') {
        yield axios_1.default.post(url_mongo, { body: { coll: 'sys', val: sys } });
    }
    return { statusCode: 200, body: JSON.stringify(sys) };
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
