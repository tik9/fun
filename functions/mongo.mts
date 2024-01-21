
import { MongoClient } from 'mongodb'
import { promises as fs } from 'fs'
import { resolve } from 'path'

var dbWeb = "website"

function main() { return new MongoClient(process.env.mongo).connect() }

export default async (req: Request) => {

    var res

    var params = new URL(req.url).searchParams
    var coll = params.get('coll')
    if (!coll) coll = 'test'

    else if (params.get('op') == 'count') res = await count(coll)
    else res = await find(coll)
    if (params.get('log')) console.log(1, res)


    // create_coll(coll)
    // res = await find(coll)
    // res = await find_one(coll, params.key!, params.val!)
    // index_create(coll!, params!.key!)
    // res = await index_remove(coll!, params!.key!)
    // res = await index_get(coll!)
    // insert('data', JSON.parse(await fs.readFile(resolve('public', 'json/add.json'), 'utf-8')))
    // insert_one(coll, { 'cat': 'Online tools I use', text: 'Spreadsheets and Excel' })

    // res = await list_coll()
    // remove_coll(coll!)
    // remove_field(coll, searchkey, searchval, 'del')
    // remove_field_all('data', 'Clients I address')
    // remove_empty('data')
    // rename_coll('subjects', 'data')
    // rename_field('data', 'category', 'cat')
    // truncate(coll!)
    // update_one('data', 'text', 'Students towards Bachelor degree and technical employees', 'text', 'Students in a Bachelor degree and employees preparing for a math exam')
    // update_many(coll, { cat: 'What famous people said' }, 'cat', 'What famous people said about learning')

    // return {
    //     headers: {
    //         'access-control-allow-origin': '*',
    //     },
    //     statusCode: 200, body: JSON.stringify(res)
    // }
    return new Response(JSON.stringify(res))
}

async function count(coll: string) { return (await main()).db(dbWeb).collection(coll).countDocuments() }

async function create_coll(coll: string) { console.log(await (await main()).db(dbWeb).createCollection(coll)) }

export async function find(coll: string, key = '', limit = 0) {
    try { return (await main()).db(dbWeb).collection(coll).find({}, { projection: { _id: 0, } }).limit(limit).toArray() } catch (error) { }
}
async function find_one(coll: string, key: string, val: string | number) { return (await main()).db(dbWeb).collection(coll).findOne({ [key]: val }) }

async function index_create(coll: string, key: string) { (await main()).db(dbWeb).collection(coll).createIndex({ [key]: 1 }, { unique: true }) }

async function index_get(coll: string) { return (await main()).db(dbWeb).collection(coll).indexes() }

async function index_remove(coll: string, key: string) { return (await main()).db(dbWeb).collection(coll).dropIndex(key) }

export async function insert_one(coll: string, obj: object) {
    try {
        var res = await (await main()).db(dbWeb).collection(coll).insertOne(obj)
        return res
    } catch (error) { console.log(1, error) }
}

async function insert(coll: string, obj: []) { return await (await main()).db(dbWeb).collection(coll).insertMany(obj) }

async function list_coll() { return (await (await main()).db(dbWeb).listCollections().toArray()).map(elem => elem.name) }

async function remove_coll(coll: string) { (await main()).db(dbWeb).collection(coll).drop() }

async function remove_empty(coll: string) { (await main()).db(dbWeb).collection(coll).deleteMany({ $size: 0 }) }


async function remove_field(coll: string, searchkey: string, searchval: string, del: string) { (await main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $unset: { [del]: "" } }) }

async function remove_field_all(coll: string, del: string) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $unset: { [del]: '' } }); }

async function remove_many(coll: string, field: string, val: string) { (await main()).db(dbWeb).collection(coll).deleteMany({ [field]: val }) }

async function rename_coll(old: string, newcoll: string) { (await main()).db(dbWeb).collection(old).rename(newcoll) }

async function rename_field(coll: string, old: string, newf: string) { (await main()).db(dbWeb).collection(coll).updateMany({}, { $rename: { [old]: newf } }) }

async function truncate(coll: string) { (await main()).db(dbWeb).collection(coll).deleteMany({}); }

async function update_one(coll: string, searchkey: string, searchval: string, key: string, val: string | boolean) { (await main()).db(dbWeb).collection(coll).updateOne({ [searchkey]: searchval }, { $set: { [key]: val } }) }

async function update_many(coll: string, filter = {}, field: string, val: string) { (await main()).db(dbWeb).collection(coll).updateMany(filter, { $set: { [field]: val } }); }