
import { exec } from 'node:child_process'

import os from "os"
import * as utils from './utils'
import * as mongo from './mongo'


function execPromise(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) { reject(error); return; }
            resolve(stdout.trim());
        });
    });
}

export async function handler(event, context) {
    try {
        var npv = await execPromise('npm -v');
    } catch (e) { console.error(e.message) }

    var sys = [
        {
            "info": "npm version",
            "value": npv,
            "category": "node"
        },
        {
            "info": "architecture",
            "value": os.arch(),
            "category": "hardware"
        },

        {
            "info": 'os version',
            "value": utils.truncate(os.version(), 30),
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
            "value": os.cpus().length,
            "category": "hardware"
        },
        {
            "info": 'speed cpu mhz',
            "value": os.cpus()[0].speed,
            "category": "hardware"
        },
        {
            "info": 'total memory',
            "value": utils.formatBytes(os.totalmem()),
            "category": "hardware"
        },
        {
            "info": 'free memory',
            "value": utils.formatBytes(os.freemem()),
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
        elem.host = utils.truncate(os.hostname(), 15)
    }

    sys.sort(utils.sortMulti('category', 'info'))
    mongo.insert_val('sys', sys)

    // file.writeJs('sys', sys)
    // for (var elem of sys) console.log(elem.info, elem.value)
    return {
        statusCode: 200,
        body: JSON.stringify(sys)
    }
}