
import axios from 'axios'
import { format_bytes, truncate } from './utils'
import { Handler } from '@netlify/functions'
import { insert_one } from './mongo'
import { IPinfoWrapper } from "node-ipinfo"
import os from "os"

export const handler: Handler = async (event) => {
    var server = {
        architecture: os.arch(),
        cores: os.cpus().length.toString(),
        'free memory': format_bytes(os.freemem()),
        // host: event.headers.host,
        // host_server: truncate(os.hostname(), 15),
        'memory': format_bytes(os.totalmem()),
        "node version": process.versions.node.split(".")[0],
        'os version': os.version(),
        platform: os.platform(),
        'os release': os.release(),
        'speed cpu mhz': os.cpus()[0].speed.toString(),
    }

    var ipinfo = (await axios.get("https://ipinfo.io/json?token=" + process.env.ipgeo)).data

    ipinfo.map = (await (new IPinfoWrapper(process.env.ipgeo!)).getMap([ipinfo.ip])).reportUrl
    var new_arr = ['ip', 'loc', 'org', 'postal'].forEach(element => { delete ipinfo[element] });

    // const server_sorted = (Object.keys(server) as Array<keyof typeof server>).sort().reduce((r: any, k) => ({ ...r, [k]: server[k] }), {});

    var res = { ...server, ...ipinfo }
    if (event.headers.host != 'localhost') {
        res.date = new Date().toISOString().slice(0, 10)
        insert_one('sys', res)
    }

    return {
        headers: { 'access-control-allow-origin': '*' },
        statusCode: 200, body: JSON.stringify(res)
    }
}