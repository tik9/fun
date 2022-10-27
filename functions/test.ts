
import { Handler } from '@netlify/functions'
import { MongoClient } from 'mongodb'

export var handler: Handler = async (event) => {
    console.log(1, event.body)
    // return
    var res
    var mc = await new MongoClient(process.env.mongo!).connect()
    res = await mc.db('website').collection('sys').countDocuments()
    console.log(1, res)
    return { statusCode: 200, body: res + JSON.stringify(event.body) }
}