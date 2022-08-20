
import { promises as fs } from "fs"
import { join, resolve } from 'path'
import { readdirSync, statSync } from 'fs'

export async function handler(event, context) {
    try {
        var dir = event.queryStringParameters.dir
        var res
        if (dir) {
            res = await listDir('public/' + dir)
            // console.log(2, res)
        } else
            res = JSON.parse(await fs.readFile(resolve('json', (event.queryStringParameters.json || 'all') + '.json')))
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }

    } catch (error) { console.log(error) }
}

export async function add_removeJs(file, data) {
    try {
        var json = JSON.parse((await fs.readFile(resolve('json', file + '.json'))).toString());
        json.push(data);
        // json.pop()
        await fs.writeFile(resolve('json', file + '.json'), JSON.stringify(json, null, 2));
    } catch (error) { console.log(1, error, file, data) }
};

export async function listDir(dir, subdir = '') {
    var dir_ = resolve(subdir, dir)
    var files = await fs.readdir(dir_);
    // console.log(1, files)
    if (dir != 'test') return files

    var res = []
    for (var file of files) {
        var wc = ('wc -l < ' + join(dir, file)).toString().trim()
        var lines = parseInt(require('child_process').execSync(wc));
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

export function writeJs(file, json) { try { fs.writeFile(resolve('json', file + '.json'), JSON.stringify(json, null, 2)); } catch (error) { console.log(error) } }
