
import { MongoClient } from 'mongodb'

// const clientPromise = (new MongoClient(process.env.mongo)).connect();

export function regex() {
    var reg_mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    console.log(reg_mail.test('t@t'))
    console.log(reg_mail.test('t@t.d'))
    console.log(reg_mail.test(''))
}

export async function handler(event) {
    const res = await (await clientPromise).db('website').collection('sys').find({}).limit(2).toArray();
    return {
        statusCode: 200,
        body: JSON.stringify(res),
        headers: { "headerName": "headerValue" },
        // isBase64Encoded: true,
    }
}