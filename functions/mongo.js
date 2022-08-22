
// import dotenv from 'dotenv'
// dotenv.config()
import * as file from './file'
import { MongoClient } from 'mongodb'
import { join } from 'path'

var dbWeb = "website"

export function main() { return new MongoClient(process.env.mongo).connect() }


export async function handler(event) {
    var searchkey = 'tool'
    var searchval = 'api'
    var key = 'name'
    var val = ''
    var coll = 'sys'
    var coll = 'mails'
    var params = event.queryStringParameters
    // console.log(1, Object.keys(params).length)
    if (Object.keys(params).length != 0) { return { statusCode: 200, body: JSON.stringify(await find(coll)) } }

    var values = [{ name: 'news', email: 'te@te.de', message: 'Newsletter abo' }]
    values = [JSON.parse(event.body)]
    var res = {}
    // res = await count(coll)
    // create_coll(coll)
    // res = await find(coll)
    // res = await find_one('sys', 'node version')
    // if (Object.keys(values).length != 0) insert_val(coll, values)
    // res = await list_coll()
    // remove_coll(coll)
    // remove_field(coll, searchkey, searchval, 'del')
    // rename_field(coll, old, newf)
    // remove_many(coll, key, val)
    // truncate_coll(coll)
    // update_one(coll, searchkey, searchval, key, val)

    return { statusCode: 200, body: JSON.stringify(res) }
}

export async function count(coll) { return (await main()).db(dbWeb).collection(coll).countDocuments() }

async function create_coll(coll) { console.log(await (await main()).db(dbWeb).createCollection(coll)) }

export async function find(coll, limit = 0) { return (await main()).db(dbWeb).collection(coll).find({}, { projection: { _id: 0 } }).limit(limit).toArray() }

export async function find_one(coll, value, field = 'info') { return (await main()).db(dbWeb).collection(coll).findOne({ [field]: value }, { _id: 0 }) }

export async function insert_val(coll, values = {}) { (await main()).db(dbWeb).collection(coll).insertMany(values) }

async function list_coll() { return (await main()).db(dbWeb).listCollections().toArray() }

async function remove_coll(coll) { (await main()).db(dbWeb).collection(coll).drop() }

async function remove_field(coll, searchkey, searchval, del) { (await main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $unset: { [del]: "" } }) }

async function remove_field_all(coll, del) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $unset: { [del]: '' } }); }

async function remove_many(coll, field, val) { (await main()).db(dbWeb).collection(coll).deleteMany({ [field]: val }) }

async function rename_coll(old, newcoll) { (await main()).db(dbWeb).collection(old).rename(newcoll) }

async function rename_field(coll, old, newf) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $rename: { [old]: newf } }) }

async function truncate_coll(coll) { (await main()).db(dbWeb).collection(coll).deleteMany({}); }

async function update_one(coll, searchkey, searchval, key, val) { (await main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $set: { [key]: val } }) }

async function update_many(coll, field, val) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $set: { [field]: val } }); }


export async function exportjs() {
    var obj = ['host', 'category', 'info', 'value']

    var res = await find('sys')
    console.log(res)
    res = JSON.parse(JSON.stringify(res, obj, 4));

    file.writeJs(join('sys'), res)
}
