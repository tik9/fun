"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert_one = exports.handler = void 0;
const mongodb_1 = require("mongodb");
var dbWeb = "website";
function main() { return new mongodb_1.MongoClient(process.env.mongo).connect(); }
const handler = async (event) => {
    var res;
    if (typeof (event.body) == 'undefined' || event.body == '{}' || event.body == '') {
        var params = event.queryStringParameters;
        var coll = params.coll;
        if (params.op == 'find' || typeof (params.op) == 'undefined')
            res = await find(coll);
        else if (params.op == 'count')
            res = await count(coll);
        // else if (params.op == 'del') remove_many(coll, params.key!, params.val!)
        // console.log(1, res)
    }
    else {
        var body = JSON.parse(event.body);
        coll = body.coll;
        var val = body.val;
        res = await insert_one(coll, val);
    }
    // create_coll(coll)
    // res = await datatype(coll, 2)
    // res = await find(coll)
    // res = await find_one(coll, params.key!, params.val!)
    // index_create(coll!, params!.key!)
    // res = await index_remove(coll!, params!.key!)
    // res = await index_get(coll!)
    // res = insert('tools', JSON.parse(await fs.readFile(resolve('public', 'json/tools.json'), 'utf-8')))
    // res=insert_val('index', res)
    // res = await list_coll()
    // res=remove_coll(coll!)
    // remove_field(coll, searchkey, searchval, 'del')
    // remove_many('tools', 'tool', 'Docker')
    // rename_field('index', 'cat', 'category')
    // truncate(coll!)
    // update_one('index', 'name', 'server', 'category', 'api')
    return {
        headers: { 'access-control-allow-origin': '*' },
        statusCode: 200, body: JSON.stringify(res)
    };
};
exports.handler = handler;
async function count(coll) { return (await main()).db(dbWeb).collection(coll).countDocuments(); }
async function create_coll(coll) { console.log(await (await main()).db(dbWeb).createCollection(coll)); }
async function datatype(coll, val) {
    return (await main()).db(dbWeb).collection(coll).aggregate([
        { $match: { tik: 2 } },
        { $addFields: { tikDataType: { $type: "$tik" } } }
    ]);
}
async function find(coll, limit = 0) {
    try {
        return (await main()).db(dbWeb).collection(coll).find({}, { projection: { _id: 0 } }).limit(limit).toArray();
    }
    catch (error) { }
}
async function find_one(coll, key, val) { return (await main()).db(dbWeb).collection(coll).findOne({ [key]: val }); }
async function index_create(coll, key) { (await main()).db(dbWeb).collection(coll).createIndex({ [key]: 1 }, { unique: true }); }
async function index_get(coll) { return (await main()).db(dbWeb).collection(coll).indexes(); }
async function index_remove(coll, key) { return (await main()).db(dbWeb).collection(coll).dropIndex(key); }
async function insert_one(coll, obj) {
    try {
        var res = await (await main()).db(dbWeb).collection(coll).insertOne(obj);
        return res;
    }
    catch (error) {
        console.log(1, error);
    }
}
exports.insert_one = insert_one;
async function insert(coll, obj) { return await (await main()).db(dbWeb).collection(coll).insertMany(obj); }
async function list_coll() { return (await (await main()).db(dbWeb).listCollections().toArray()).map(elem => elem.name); }
async function remove_coll(coll) { (await main()).db(dbWeb).collection(coll).drop(); }
async function remove_field(coll, searchkey, searchval, del) { (await main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $unset: { [del]: "" } }); }
async function remove_field_all(coll, del) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $unset: { [del]: '' } }); }
async function remove_many(coll, field, val) { (await main()).db(dbWeb).collection(coll).deleteMany({ [field]: val }); }
async function rename_coll(old, newcoll) { (await main()).db(dbWeb).collection(old).rename(newcoll); }
async function rename_field(coll, old, newf) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $rename: { [old]: newf } }); }
async function truncate(coll) { (await main()).db(dbWeb).collection(coll).deleteMany({}); }
async function update_one(coll, searchkey, searchval, key, val) { (await main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $set: { [key]: val } }); }
async function update_many(coll, field, val) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $set: { [field]: val } }); }
