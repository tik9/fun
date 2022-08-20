
// import path from 'path'
// import dotenv from 'dotenv'
// dotenv.config()
// import { promises as fs } from 'fs'
// var fs = require('mz/fs')
import rubico from 'rubico/dist/rubico.mjs'

const { pipe, map, filter } = rubico


// pipe(funcs Array < function>)(value any) -> result any
// const pipe = funcs => function pipeline(value) {
//     let result = value
//     for (const func of funcs) result = func(result)
//     return result
// }

function gen() {
    // console.log(1, Array.from({ length: 10 }, (_, i) => i))
    console.log(Array.from([1, 2, 3], x => x));
    // function range(start, stop, step) { return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step)) }
    // console.log(1, range(1, 4, 1))
}
// gen()

function todo() {
    const toTodosUrl = id => `https://jsonplaceholder.typicode.com/todos/${id}`

    const logTodoByID = pipe([ // fetch a Todo and log it
        id => `https://jsonplaceholder.typicode.com/todos/${id}`,
        fetch,
        response => response.json(),
        console.log,
    ])

    map(logTodoByID)([1, 2, 3])
}
// todo()

async function square() {
    const isOdd = number => number % 2 == 1
    var asyncSquare = number => number ** 2
    const squaredOdds = pipe([filter(isOdd), map(asyncSquare),])
    console.log(squaredOdds([1, 2, 3, 4, 5]))
}
// square()

function logCalledWith(number) { console.log('add10 called with', number) }

let numCalls = 0

function incNumCalls() { numCalls += 1 }

function logNumCalls() { console.log('add10 called', numCalls, 'times') }

function add10(number) { number + 10 }


// tap(func function)(value any) -> value
const tap = func => function tapping(value) {
    func(value)
    return value
}

const add10WithSide = pipe([
    tap(logCalledWith),
    tap(incNumCalls),
    tap(logNumCalls),
    add10,
])

// add10WithSide(10)
