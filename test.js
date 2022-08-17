
import dotenv from 'dotenv'
dotenv.config()

function test2() {
    var test = [{ a: { b: 123 } }, { c: { d: 123 } }]
    for (elem of test) {
        console.log(Object.keys(elem))
    }
}

export async function test() {
}

test()