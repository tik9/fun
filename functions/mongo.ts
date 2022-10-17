
import { Handler } from '@netlify/functions'
import { MongoClient } from 'mongodb'
import { promises as fs } from 'fs'
import { resolve } from 'path'
var dbWeb = "website"

function main() {
    // console.log(1, process.env.mongo?.slice(-5))
    return new MongoClient(process.env.mongo!).connect()
}

export const handler: Handler = async (event) => {
    var res
    if (typeof (event.body) == 'undefined' || event.body == '{}') {

        var params = event.queryStringParameters!
        // console.log(1, params.op, 2, typeof (params.op) == 'undefined')
        var coll = params.coll!
        if (params.op == 'find' || typeof (params.op) == 'undefined') res = await find(coll)
        else if (params.op == 'count') res = await count(coll)
        // else if (params.op == 'del') remove_many(coll, params.key!, params.val!)
    } else {
        // console.log(3, event.body, 4, typeof (event.body) == 'undefined')
        var body = JSON.parse(event.body!);
        res = insert_one(body.body.coll, body.body.val)
    }

    console.log(1, res)

    // create_coll(coll)
    // res = await datatype(coll, 2)
    // res = await find(coll)
    // res = await find_one(coll, params.key!, params.val!)
    // index_create(coll!, params!.key!)
    // res = await index_get(coll!)
    // res = await index_remove(coll!, params!.key!)
    // insert('index', JSON.parse(await fs.readFile(resolve('public', 'json/index.json'), 'utf-8')))
    // insert_val('index', res)
    // res = await list_coll()
    // remove_coll(coll!)
    // remove_field(coll, searchkey, searchval, 'del')
    // remove_many('tools', 'tool', 'intro')
    // rename_field('index', 'cat', 'category')
    // truncate(coll!)
    // update_one('index', 'name', 'tools', 'name', 'subjects')

    return {
        // headers: { "Access-Control-Allow-Origin": "*" },
        statusCode: 200, body: JSON.stringify(res)
    }
}

async function count(coll: string) { return (await main()).db(dbWeb).collection(coll).countDocuments() }

async function create_coll(coll: string) { console.log(await (await main()).db(dbWeb).createCollection(coll)) }

async function datatype(coll: string, val: string | number) {
    return (await main()).db(dbWeb).collection(coll).aggregate([
        { $match: { tik: 2 } },
        { $addFields: { tikDataType: { $type: "$tik" } } }
    ])
}
async function find(coll: string, limit = 0) {
    try {
        return (await main()).db(dbWeb).collection(coll).find({}, { projection: { _id: 0 } }).limit(limit).toArray()

    } catch (error) { }
}
async function find_one(coll: string, key: string, val: string | number) { return (await main()).db(dbWeb).collection(coll).findOne({ [key]: val }) }

async function index_create(coll: string, key: string) { (await main()).db(dbWeb).collection(coll).createIndex({ [key]: 1 }, { unique: true }) }

async function index_get(coll: string) { return (await main()).db(dbWeb).collection(coll).indexes() }

async function index_remove(coll: string, key: string) { return (await main()).db(dbWeb).collection(coll).dropIndex(key) }

export async function insert_one(coll: string, obj: object) { return await (await main()).db(dbWeb).collection(coll).insertOne(obj) }

async function insert(coll: string, obj: []) { return await (await main()).db(dbWeb).collection(coll).insertMany(obj) }

async function list_coll() { return (await (await main()).db(dbWeb).listCollections().toArray()).map(elem => elem.name) }

async function remove_coll(coll: string) { (await main()).db(dbWeb).collection(coll).drop() }

async function remove_field(coll: string, searchkey: string, searchval: string, del: string) { (await main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $unset: { [del]: "" } }) }

async function remove_field_all(coll: string, del: string) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $unset: { [del]: '' } }); }

async function remove_many(coll: string, field: string, val: string) { (await main()).db(dbWeb).collection(coll).deleteMany({ [field]: val }) }

async function rename_coll(old: string, newcoll: string) { (await main()).db(dbWeb).collection(old).rename(newcoll) }

async function rename_field(coll: string, old: string, newf: string) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $rename: { [old]: newf } }) }

async function truncate(coll: string) { (await main()).db(dbWeb).collection(coll).deleteMany({}); }

async function update_one(coll: string, searchkey: string, searchval: string, key: string, val: string) { (await main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $set: { [key]: val } }) }

async function update_many(coll: string, field: string, val: []) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $set: { [field]: val } }); }