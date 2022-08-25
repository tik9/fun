
import { MongoClient } from 'mongodb'
const clientPromise = (new MongoClient(process.env.mongo)).connect();
import { promises as fs } from 'fs'
import { join, resolve } from 'path';

export function regex() {
    var reg_mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    console.log(reg_mail.test('t@t'))
    console.log(reg_mail.test('1@1.1'))
    console.log(reg_mail.test(''))
}

export async function handler(event) {
    // dir = 'public'
    var dir = 'assets'
    var file = join(dir, 'test.json')
    console.log(file)
    var res = await (await clientPromise).db('website').collection('mails').find({}).toArray();
    res = await fs.readFile(file)

    return {
        statusCode: 200,
        body: JSON.stringify(res),
        headers: { "headerName": "headerValue" },
        // isBase64Encoded: true,
    }
}