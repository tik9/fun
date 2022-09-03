
import * as mongo from './mongo'
import { IPinfoWrapper } from "node-ipinfo"
import axios from 'axios';


export const handler = async (event, context) => {
    var res
    const ipinfo = new IPinfoWrapper(process.env.ipgeo);
    res = (await axios.get("https://ipinfo.io/json?token=" + process.env.ipgeo)).data
    res.map = (await ipinfo.getMap([res.ip])).reportUrl
    res.date = new Date()

    // console.log(res, 2, event.headers.host);
    if (event.headers.host != 'localhost:8888')
        mongo.insert_one('geo', res)
    return { body: JSON.stringify(res), statusCode: 200 }
}