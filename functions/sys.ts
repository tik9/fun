
import { datetime, format_bytes, sortList } from './utils'
import { insert_one } from './mongo'
import * as os from "os"

export default async () => {
    var res = {
        architecture: os.arch(),
        cores: os.cpus().length.toString(),
        date: datetime(new Date()),
        'free memory': format_bytes(os.freemem()),
        host_server: os.hostname(),
        'total memory': format_bytes(os.totalmem()),
        "node version": process.versions.node.split(".")[0],
        'os version': os.version(),
        platform: os.platform(),
        'os release': os.release(),
        'speed cpu mhz': os.cpus()[0].speed.toString(),
    }

    // var ipinfo = await (await fetch("https://ipinfo.io/json?token=" + process.env.ipgeo)).json()
    // ipinfo.location = (await (new IPinfoWrapper(process.env.ipgeo!)).getMap([ipinfo.ip])).reportUrl

    // var new_arr = ['loc', 'org', 'postal'].forEach(element => { delete ipinfo[element] });

    // ipinfo = Object.keys(ipinfo).reduce((acc, key) => ({ ...acc, ...{ [{ city: 'region city', country: 'region country' }[key] || key]: ipinfo[key] } }), {});

    // sortList(res)
    // if (host != 'localhost') {
    // insert_one('sys', res)
    // }
    console.log(1, res)

    return new Response(JSON.stringify(res))
    // headers: { 'access-control-allow-origin': '*' },
}   