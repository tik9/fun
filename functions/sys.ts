
import fetch from 'node-fetch'
import { renameKeys, datetime } from './utils'
import { format_bytes } from './utils'
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
        'total memory': format_bytes(os.totalmem()),
        "node version": process.versions.node.split(".")[0],
        'os version': os.version(),
        platform: os.platform(),
        'os release': os.release(),
        'speed cpu mhz': os.cpus()[0].speed.toString(),
    }

    var ipinfo = await (await fetch("https://ipinfo.io/json?token=" + process.env.ipgeo)).json()
    console.log(1, ipinfo)
    //@ts-ignore
    ipinfo['server location'] = (await (new IPinfoWrapper(process.env.ipgeo!)).getMap([ipinfo.ip])).reportUrl

    //@ts-ignore
    var new_arr = ['ip', 'loc', 'org', 'postal'].forEach(element => { delete ipinfo[element] });
    //@ts-ignore
    ipinfo = renameKeys({ city: 'region city', country: 'region country', timezone: 'server timezone' }, ipinfo)

    //@ts-ignore
    var res = { ...server, ...ipinfo }
    if (event.headers.host != 'localhost') {
        res['server date'] = datetime(new Date())
        insert_one('sys', res)
    }

    return {
        headers: { 'access-control-allow-origin': '*' },
        statusCode: 200, body: JSON.stringify(res)
    }
}