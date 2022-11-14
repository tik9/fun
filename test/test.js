
import { join } from "path"
import { promises as fs } from 'fs'

export async function alljs() {
    var res = await fs.readFile(join('json', '.json'))
    for (var json of JSON.parse(res)) {
        if (typeof json.pages != 'undefined') {
            console.log(json.pages)
            return
        }
    }
}
