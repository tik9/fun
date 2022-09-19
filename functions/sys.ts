
import { Handler } from '@netlify/functions'
import axios from 'axios'
import { exec } from 'node:child_process'

import os from "os"

export const handler: Handler = async (event) => {
    let url = process.env.URL + '/.netlify/functions/'
    let url_utils = url + 'utils?'
    let url_mongo = url + 'mongo'

    interface one_sys {
        info: string
        value: string
        category: string
        date?: string
        host?: string
        // [key: string]: string;
    }

    var sys: one_sys[] = [
        {
            "info": "npm version",
            "value": await execPromise('npm -v') as string,
            "category": "node"
        },
        {
            "info": "architecture",
            "value": os.arch(),
            "category": "hardware"
        },

        {
            "info": 'os version',
            "value": url_utils + 'truncate&param=' + os.version() + 'length=30',
            "category": "os"
        },
        {
            "info": "platform",
            "value": os.platform(),
            "category": "os"
        },
        {
            "info": "release",
            "value": os.release(),
            "category": "os"
        },
        {
            "info": "cores",
            "value": os.cpus().length.toString(),
            "category": "hardware"
        },
        {
            "info": 'speed cpu mhz',
            "value": os.cpus()[0].speed.toString(),
            "category": "hardware"
        },
        {
            "info": 'total memory',
            "value": (await axios.get(url_utils + 'fun=bytes&param=' + os.totalmem())).data,
            "category": "hardware"
        },
        {
            "info": 'free memory',
            "value": (await axios.get(url_utils + 'fun=bytes&param=' + os.freemem())).data,
            "category": "hardware"
        },
        {
            "info": "node version",
            "value": process.versions.node.split(".")[0],
            "category": "node"
        },
    ]

    for (var elem of sys) {
        elem.date = new Date().toISOString().slice(0, 10)
        elem.host = (await axios.get(url_utils + 'fun=truncate&param=' + os.hostname() + '&length=13')).data
    }
    console.log(sys)
    // sys.sort(utils.sort('category'))
    if (event.headers.host != 'localhost:80') {
        await axios.post(url_mongo, { body: { coll: 'sys', val: sys } })
    }
    return { statusCode: 200, body: JSON.stringify(sys) }
}

function execPromise(command: string) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) { reject(error); return; }
            resolve(stdout.trim());
        });
    });
}