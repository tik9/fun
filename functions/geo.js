
import * as mongo from './mongo'
import { IPinfoWrapper } from "node-ipinfo"

export const handler = async (event) => {

    const ipinfo = new IPinfoWrapper(process.env.ipgeo);
    // var res = await ipinfo.lookupIp('1.1.1.1')
    var res = await (await fetch("https://ipinfo.io/json?token=" + process.env.ipgeo)).json()
    // var map = (await ipinfo.getMap([res.ip])
    // console.log(map);
    res.map = (await ipinfo.getMap([res.ip])).reportUrl

    // mongo.insert_val('geo', [res])
    return { body: JSON.stringify(res), statusCode: 200 }
}