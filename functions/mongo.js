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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mongodb_1 = require("mongodb");
var dbWeb = "website";
function main() { return new mongodb_1.MongoClient(process.env.mongo).connect(); }
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(1, Object.keys(event.body!).length, 2, event.body)
    var res;
    var params = event.queryStringParameters;
    // let coll: string = Object(event.body).body.coll ? Object(event.body).body.coll : params.coll
    if (typeof (event.body) != 'undefined') {
        // let arr: []
        var body = JSON.parse(event.body);
        var coll = body.body.coll;
        // console.log(3, coll, body)
        let arr = body.body.val;
        res = [coll, arr];
        insert(coll, arr);
    }
    else if (Object.keys(params).length != 0) {
        if (params.op == 'find')
            res = yield find(params.coll);
        else if (params.op == 'count')
            res = yield count(params.coll);
        else if (params.op == 'del')
            remove_many(params.coll, params.key, params.val);
        // console.log(3, res)
    }
    // create_coll(coll)
    // res = await datatype(coll, 2)
    // res = await find(coll)
    // res = await find_one(coll, params.key!, params.val!)
    // res = JSON.parse(await fs.readFile(resolve('public', 'json', 'index.json')))
    // index_create(coll, params.field!)
    // res = await index_get(coll)
    // insert('index', [])
    // insert_val('index', res)
    // res = await list_coll()
    // remove_coll(coll)
    // remove_field(coll, searchkey, searchval, 'del')
    // rename_coll('geo', 'client')
    // truncate(coll)
    // update_one('index', 'name', 'cloud', 'name', 'social_cloud')
    return { statusCode: 200, body: JSON.stringify(res) };
});
exports.handler = handler;
function count(coll) {
    return __awaiter(this, void 0, void 0, function* () { return (yield main()).db(dbWeb).collection(coll).countDocuments(); });
}
function create_coll(coll) {
    return __awaiter(this, void 0, void 0, function* () { console.log(yield (yield main()).db(dbWeb).createCollection(coll)); });
}
function datatype(coll, val) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield main()).db(dbWeb).collection(coll).aggregate([
            { $match: { tik: 2 } },
            { $addFields: { tikDataType: { $type: "$tik" } } }
        ]);
    });
}
function find(coll, limit = 0) {
    return __awaiter(this, void 0, void 0, function* () { return (yield main()).db(dbWeb).collection(coll).find({}, { projection: { _id: 0 } }).limit(limit).toArray(); });
}
function find_one(coll, key, val) {
    return __awaiter(this, void 0, void 0, function* () { return (yield main()).db(dbWeb).collection(coll).findOne({ [key]: val }); });
}
function index_create(coll, key) {
    return __awaiter(this, void 0, void 0, function* () { (yield main()).db(dbWeb).collection(coll).createIndex({ [key]: 1 }, { unique: true }); });
}
function index_get(coll) {
    return __awaiter(this, void 0, void 0, function* () { return (yield main()).db(dbWeb).collection(coll).indexes(); });
}
function insert_one(coll, obj) {
    return __awaiter(this, void 0, void 0, function* () { return (yield main()).db(dbWeb).collection(coll).insertOne(obj); });
}
function insert(coll, obj) {
    return __awaiter(this, void 0, void 0, function* () {
        var res;
        try {
            res = yield (yield main()).db(dbWeb).collection(coll).insertMany(obj);
        }
        catch (error) { }
        return res;
    });
}
function list_coll() {
    return __awaiter(this, void 0, void 0, function* () { return (yield (yield main()).db(dbWeb).listCollections().toArray()).map(elem => elem.name); });
}
function remove_coll(coll) {
    return __awaiter(this, void 0, void 0, function* () { (yield main()).db(dbWeb).collection(coll).drop(); });
}
function remove_field(coll, searchkey, searchval, del) {
    return __awaiter(this, void 0, void 0, function* () { (yield main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $unset: { [del]: "" } }); });
}
function remove_field_all(coll, del) {
    return __awaiter(this, void 0, void 0, function* () { (yield main()).db(dbWeb).collection(coll).updateMany({}, { $unset: { [del]: '' } }); });
}
function remove_many(coll, field, val) {
    return __awaiter(this, void 0, void 0, function* () { (yield main()).db(dbWeb).collection(coll).deleteMany({ [field]: val }); });
}
function rename_coll(old, newcoll) {
    return __awaiter(this, void 0, void 0, function* () { (yield main()).db(dbWeb).collection(old).rename(newcoll); });
}
function rename_field(coll, old, newf) {
    return __awaiter(this, void 0, void 0, function* () { (yield main()).db(dbWeb).collection(coll).updateMany({}, { $rename: { [old]: newf } }); });
}
function truncate(coll) {
    return __awaiter(this, void 0, void 0, function* () { (yield main()).db(dbWeb).collection(coll).deleteMany({}); });
}
function update_one(coll, searchkey, searchval, key, val) {
    return __awaiter(this, void 0, void 0, function* () { (yield main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $set: { [key]: val } }); });
}
function update_many(coll, field, val) {
    return __awaiter(this, void 0, void 0, function* () { (yield main()).db(dbWeb).collection(coll).updateMany({}, { $set: { [field]: val } }); });
}
