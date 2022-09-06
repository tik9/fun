
import axios from 'axios';
import * as mongo from './mongo'
import { IPinfoWrapper } from "node-ipinfo"


export const handler = async (event, context) => {
    var res
    const ipinfo = new IPinfoWrapper(process.env.ipgeo);
    try {
        res = (await axios.get("https://ipinfo.io/json?token=" + process.env.ipgeo)).data
    } catch (error) {

    }
    res.map = (await ipinfo.getMap([res.ip])).reportUrl
    res.date = new Date().toISOString().substring(0, 10)

    console.log(res);
    if (event.headers.host != 'localhost:8888')
        mongo.insert_one('client', res)
    return { body: JSON.stringify(res), statusCode: 200 }
}