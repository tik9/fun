
import { exec } from 'node:child_process'
import { join, resolve } from 'path'
import { promises as fs } from "fs"
import { readdirSync, statSync } from 'fs'

export async function handler(event, context) {
    try {
        var dir = event.queryStringParameters.dir
        var res
        if (dir) res = await listDir(join('public', dir))
        else res = JSON.parse(await fs.readFile(join('public', 'json', event.queryStringParameters.json + '.json')))
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }

    } catch (error) { console.log(error) }
}

export async function create() {
    var arr = []
    var all = 'all.json'
    var filepath = resolve('public', 'json')
    console.log(1, filepath)
    for (var json of await fs.readdir(filepath)) {
        if (json != 'posts.json' && json != all) {
            var obj = {}
            obj[json.split('.')[0]] = JSON.parse((await fs.readFile(resolve(filepath, json))).toString())
            arr.push(obj)
        }
    }
    writeJs(resolve(filepath, all), arr)
}

export async function add_removeJs(file, data) {
    try {
        var filepath = resolve('public', 'json', file + '.json')
        console.log(1, filepath)
        var json = JSON.parse((await fs.readFile(filepath)).toString());
        json.push(data);
        // json.pop()
        await fs.writeFile(resolve(filepath), JSON.stringify(json, null, 2));
    } catch (error) { console.log(1, error, file, data) }
};

export async function listDir(dir, subdir = '') { return await fs.readdir(dir); }

export async function listTest() {
    var files = await fs.readdir(resolve('tests'));
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

export function writeJs(file, json) { try { fs.writeFile(resolve('public', 'json', file), JSON.stringify(json, null, 2)); } catch (error) { console.log(error) } }
