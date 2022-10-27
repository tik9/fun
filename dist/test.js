"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mongodb_1 = require("mongodb");
var handler = async (event) => {
    console.log(1, event.body);
    // return
    var res;
    var mc = await new mongodb_1.MongoClient(process.env.mongo).connect();
    res = await mc.db('website').collection('sys').countDocuments();
    console.log(1, res);
    return { statusCode: 200, body: res + JSON.stringify(event.body) };
};
exports.handler = handler;
