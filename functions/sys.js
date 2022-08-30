
import { exec } from 'node:child_process'

import os from "os"
import * as utils from './modules/utils.js'
import * as mongo from './mongo.js'


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
            "npm version": npv,
            "category": "node"
        },
        {
            "architecture": os.arch(),
            "category": "hardware"
        },

        {
            "os version": utils.truncate(os.version(), 30),
            "category": "os"
        },
        {
            "platform": os.platform(),
            "category": "os"
        },
        {
            "release": os.release(),
            "category": "os"
        },
        {
            "cores": os.cpus().length,
            "category": "hardware"
        },
        {
            "speed cpu mhz": os.cpus()[0].speed,
            "category": "hardware"
        },
        {
            "total memory": utils.formatBytes(os.totalmem()),
            "category": "hardware"
        },
        {
            "free memory": utils.formatBytes(os.freemem()),
            "category": "hardware"
        },
        {
            "node version": process.versions.node.split(".")[0],
            "category": "node"
        },
    ]

    for (var elem of sys) {
        elem.date = new Date().toISOString().slice(0, 10)
        elem.host = utils.truncate(os.hostname(), 15)
    }

    sys.sort(utils.sort('category'))
    mongo.insert_val('sys', sys)

    // file.writeJs('sys', sys)
    // for (var elem of sys) console.log(elem.info, elem.value)
    return {
        statusCode: 200,
        body: JSON.stringify(sys)
    }
}