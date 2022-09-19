
import { Handler } from '@netlify/functions'
import { MongoClient } from 'mongodb'
import { promises as fs } from 'fs'
import { resolve } from 'path'
var dbWeb = "website"

function main() { return new MongoClient(process.env.mongo!).connect() }

export const handler: Handler = async (event) => {
    // console.log(1, Object.keys(event.body!).length, 2, event.body)
    var res
    var params = event.queryStringParameters!
    // let coll: string = Object(event.body).body.coll ? Object(event.body).body.coll : params.coll
    if (typeof (event.body) != 'undefined') {
        // let arr: []
        var body = JSON.parse(event.body!);
        var coll = body.body.coll
        // console.log(3, coll, body)
        let arr = body.body.val
        res = [coll, arr]
        insert(coll, arr)
    }
    else if (Object.keys(params).length != 0) {
        if (params.op == 'find') res = await find(params.coll!)
        else if (params.op == 'count') res = await count(params.coll!)
        else if (params.op == 'del') remove_many(params.coll!, params.key!, params.val!)
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

    return { statusCode: 200, body: JSON.stringify(res) }
}

async function count(coll: string) { return (await main()).db(dbWeb).collection(coll).countDocuments() }

async function create_coll(coll: string) { console.log(await (await main()).db(dbWeb).createCollection(coll)) }

async function datatype(coll: string, val: string | number) {
    return (await main()).db(dbWeb).collection(coll).aggregate([
        { $match: { tik: 2 } },
        { $addFields: { tikDataType: { $type: "$tik" } } }
    ])
}
async function find(coll: string, limit = 0) { return (await main()).db(dbWeb).collection(coll).find({}, { projection: { _id: 0 } }).limit(limit).toArray() }

async function find_one(coll: string, key: string, val: string | number) { return (await main()).db(dbWeb).collection(coll).findOne({ [key]: val }) }

async function index_create(coll: string, key: string) { (await main()).db(dbWeb).collection(coll).createIndex({ [key]: 1 }, { unique: true }) }

async function index_get(coll: string) { return (await main()).db(dbWeb).collection(coll).indexes() }

async function insert_one(coll: string, obj: object) { return (await main()).db(dbWeb).collection(coll).insertOne(obj) }

async function insert(coll: string, obj: []) {
    var res
    try {
        res = await (await main()).db(dbWeb).collection(coll).insertMany(obj)
    }
    catch (error) { }
    return res
}

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