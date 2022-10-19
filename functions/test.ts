
import { Handler } from '@netlify/functions'
import { MongoClient } from 'mongodb'

export var handler: Handler = async (event) => {
    console.log(1, event.body)

    var mc = await new MongoClient(process.env.mongo!).connect()
    var res = await mc.db('website').collection('index').countDocuments()
    // console.log(1, res)
    return { statusCode: 200, body: process.env.mongo!.slice(0, 10) + ', numbers ' + res + ',event ' + JSON.stringify(event.body) }
}