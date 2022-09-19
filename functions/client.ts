
import axios from 'axios';
import { IPinfoWrapper } from "node-ipinfo"
import { Handler } from '@netlify/functions'
import { hostname } from 'os'


export const handler: Handler = async (event) => {
    var res
    const ipinfo = new IPinfoWrapper(process.env.ipgeo!);
    res = (await axios.get("https://ipinfo.io/json?token=" + process.env.ipgeo)).data

    res.map = (await ipinfo.getMap([res.ip])).reportUrl
    res.date = new Date().toISOString().substring(0, 10)
    res.host_name = hostname().slice(0, 10)
    res.tik = 2
    // console.log(1, event.headers.host);
    // if (event.headers.host != 'localhost') {
    await axios.post(process.env.URL + '/.netlify/functions/mongo', { body: { coll: 'client', val: [res] } })
    // }
    return { body: JSON.stringify(res), statusCode: 200 }
}