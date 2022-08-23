
import { exec } from 'node:child_process'
import { join, resolve } from 'path'
import * as mongo from './mongo'
import { promises as fs } from "fs"
import { readdirSync, statSync } from 'fs'

var asset_dir = './public/'
var all = 'all.json'
var filepath = resolve(asset_dir, 'json')

export async function handler(event) {
    var params = event.queryStringParameters
    var res
    try {
        // var cont = JSON.stringify(JSON.parse(await fs.readFile(join(filepath, all))))
        for (var json of await fs.readdir(filepath)) {
            var obj = {}
            var cont = JSON.parse(await fs.readFile(join(filepath, json)))
            var name = json.split('.')[0]
            // obj[name] = cont
            // arr.push(obj)
            // console.log(1, name, cont, json)
            mongo.insert_val(name, cont)
        }

        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }

    } catch (error) { console.log(error) }
}


export async function add_removeJs(file, data) {
    var filepath = join(asset_dir, 'json', file)
    try {
        var json = JSON.parse((await fs.readFile(filepath)).toString());
        json.push(data);
        // json.pop()
        await fs.writeFile(filepath, JSON.stringify(json, null, 2));
    } catch (error) { console.log(1, error, file, data) }
};

export async function listDir(dir, subdir = '') { return await fs.readdir(dir); }


export function writeJs(file, json) { try { fs.writeFile(join(asset_dir, 'json', file), JSON.stringify(json, null, 2)); } catch (error) { console.log(error) } }



export async function listTest() {
    var files = await fs.readdir(join('tests'));
    // console.log(1, files)

    var res = []
    for (var file of files) {
        var wc = ('wc -l < ' + join(dir, file)).toString().trim()
        var lines = parseInt(exec(wc));
        var extension = file.replace(/.*\./, '')
        if (!['ts', 'sh'].includes(extension)) continue

        res.push({ file, extension, lines });
    };
    writeJs('./json/tests.json', res)
}


function listDir_path(dir_) {
    var unfold = (f, initState) =>
        f((value, nextState) => [value, ...unfold(f, nextState)]
            , () => []
            , initState
        )

    const None = Symbol()

    const relativePaths = (path = '.') =>
        readdirSync(path).map(p => join(path, p))

    const traverseDir = (dir) =>
        unfold
            ((next, done, [path = None, ...rest]) =>
                path === None
                    ? done()
                    : next(path, statSync(path).isDirectory()
                        ? relativePaths(path).concat(rest)
                        : rest
                    )
                , relativePaths(dir)
            )

    return traverseDir(dir_)
}

async function fetchjs() {
    var res = await listDir(asset_dir)
    res = JSON.parse(await fs.readFile(join(asset_dir, 'json',)))
}