
import { MongoClient } from 'mongodb'

const mongoClient = new MongoClient(process.env.mongo);

const clientPromise = mongoClient.connect();

export async function handler(event) {
    try {
        const database = (await clientPromise).db('website');
        const res = await database.collection('sys').find({}).limit(3).toArray();
        return {
            statusCode: 200,
            body: JSON.stringify(res),
            // // more keys you can return:
            // headers: { "headerName": "headerValue", ... },
            // isBase64Encoded: true,
        }

    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}