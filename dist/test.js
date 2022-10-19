"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mongodb_1 = require("mongodb");
var handler = async (event) => {
    console.log(1, event.body);
    var mc = await new mongodb_1.MongoClient(process.env.mongo).connect();
    var res = await mc.db('website').collection('index').countDocuments();
    // console.log(1, res)
    return { statusCode: 200, body: process.env.mongo.slice(0, 10) + ', numbers ' + res + ',event ' + JSON.stringify(event.body) };
};
exports.handler = handler;
