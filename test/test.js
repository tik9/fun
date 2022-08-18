
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
import { promises as fs } from 'fs'

export async function test() {
    var content = JSON.parse((await fs.readFile(path.resolve('json', 'posts_in.json'))).toString())
    // console.log(content)
    fs.writeFile(path.resolve('json', 'posts.json'), JSON.stringify(content))

}
test()


function test2() {
    var test = [{ a: { b: 123 } }, { c: { d: 123 } }]
    for (elem of test) {
        console.log(Object.keys(elem))
    }
}
