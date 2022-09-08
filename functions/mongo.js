
import { resolve } from 'path'
import { MongoClient } from 'mongodb'
import { promises as fs } from 'fs'

var dbWeb = "website"

export function main() { return new MongoClient(process.env.mongo).connect() }

export async function handler(event) {
    var res
    var params = event.queryStringParameters
    if (typeof (params.para1) != 'undefined') {
        // console.log('', await find(params.para1))
        return { statusCode: 200, body: JSON.stringify(await find(params.para1)) }
    }
    // res = await index_get()
    // res = await index_create()
    // var values = [{ name: 'news', email: 'te@te.de', message: 'Newsletter abo' }]
    // values = [JSON.parse(event.body)]
    // res = await count(coll)
    // create_coll(coll)
    // res = await find(coll)
    // res = await find_one('sys', 'node version')
    // res = JSON.parse(await fs.readFile(resolve('public', 'json', 'index.json')))
    // console.log(res)
    // insert_val('index', res)
    // res = await list_coll()
    // remove_coll(coll)
    // remove_field(coll, searchkey, searchval, 'del')
    // rename_coll('geo', 'client')
    // remove_many(coll, key, val)
    // if (Object.keys(values).length != 0) insert_val(coll, values)
    // update_one(coll, searchkey, searchval, key, val)

    return { statusCode: 200, body: JSON.stringify(res) }
}

export async function count(coll) { return (await main()).db(dbWeb).collection(coll).countDocuments() }

async function create_coll(coll) { console.log(await (await main()).db(dbWeb).createCollection(coll)) }

export async function find(coll, limit = 0) { return (await main()).db(dbWeb).collection(coll).find({}, { projection: { _id: 0 } }).limit(limit).toArray() }

export async function find_one(coll, value, field = 'info') { return (await main()).db(dbWeb).collection(coll).findOne({ [field]: value }, { _id: 0 }) }

async function index_create() { (await main()).db(dbWeb).collection('geo').createIndex({ "ip": 1 }, { unique: true }) }

export async function index_get() { return (await main()).db(dbWeb).collection('geo').getIndexes() }

export async function insert_one(coll, obj) { return (await main()).db(dbWeb).collection(coll).insertOne(obj) }

export async function insert_val(coll, obj) { return (await main()).db(dbWeb).collection(coll).insertMany(obj) }

async function list_coll() { return (await (await main()).db(dbWeb).listCollections().toArray()).map(elem => elem.name) }

async function remove_coll(coll) { (await main()).db(dbWeb).collection(coll).drop() }

async function remove_field(coll, searchkey, searchval, del) { (await main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $unset: { [del]: "" } }) }

async function remove_field_all(coll, del) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $unset: { [del]: '' } }); }

async function remove_many(coll, field, val) { (await main()).db(dbWeb).collection(coll).deleteMany({ [field]: val }) }

async function rename_coll(old, newcoll) { (await main()).db(dbWeb).collection(old).rename(newcoll) }

async function rename_field(coll, old, newf) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $rename: { [old]: newf } }) }

export async function truncate_coll(coll) { (await main()).db(dbWeb).collection(coll).deleteMany({}); }

async function update_one(coll, searchkey, searchval, key, val) { (await main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $set: { [key]: val } }) }

async function update_many(coll, field, val) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $set: { [field]: val } }); }


export async function exportjs() {
    var obj = ['host', 'category', 'info', 'value']

    var res = await find('sys')
    console.log(res)
    res = JSON.parse(JSON.stringify(res, obj, 4));

    file.writeJs(resolve('sys'), res)
}
