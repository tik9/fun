
import axios from 'axios'
import { exec } from 'node:child_process'
import { format_bytes, truncate } from './utils'
import { Handler } from '@netlify/functions'
import { insert_one } from './mongo'
import { IPinfoWrapper } from "node-ipinfo"
import os from "os"

export const handler: Handler = async (event) => {
    var server = {
        architecture: os.arch(),
        cores: os.cpus().length.toString(),
        date: new Date().toISOString().slice(0, 10),
        'free memory': format_bytes(os.freemem()),
        host: event.headers.host,
        host_server: truncate(os.hostname(), 15),
        'memory': format_bytes(os.totalmem()),
        "node": process.versions.node.split(".")[0],
        'os': truncate(os.version(), 30),
        platform: os.platform(),
        release: os.release(),
        'speed cpu mhz': os.cpus()[0].speed.toString(),
        npm_version: ''
    }
    if (event.headers.host == 'localhost') server.npm_version = await execPromise('npm -v') as string

    const ipinfo = new IPinfoWrapper(process.env.ipgeo!);
    var client = (await axios.get("https://ipinfo.io/json?token=" + process.env.ipgeo)).data

    var new_arr = ['loc', 'org', 'postal'].forEach(element => { delete client[element] });

    client.map = (await ipinfo.getMap([client.ip])).reportUrl

    const server_sorted = (Object.keys(server) as Array<keyof typeof server>).sort().reduce((r: any, k) => ({ ...r, [k]: server[k] }), {});

    var res = { ...server_sorted, ...client }
    if (event.headers.host != 'localhost') insert_one('sys', res)
    console.log(res)

    return {
        headers: { 'access-control-allow-origin': '*' },
        statusCode: 200, body: JSON.stringify(res)
    }
}

function execPromise(command: string) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) { reject(error); return; }
            resolve(stdout.trim());
        });
    });
}