
import { Handler } from '@netlify/functions'
import axios from 'axios';

export var handler: Handler = async () => {
    var res
    // res = await (await fetch("https://icanhazdadjoke.com", { headers: { Accept: "application/json", "user-agent": "tiapo.netlify.app, timo@tik1.net" } })).json()
    // res = res.data
    // console.log(1, await repos(), await rate_limit())
    // runThenFunction()
    // runAwaitFunction()
    console.log(1, await testProm(), 2)
    return { statusCode: 200, body: JSON.stringify(res) }
}
async function testTime() {
    await setTimeout(() => {
        console.log(123)
    }, 2000);
}

function testProm() {
    return new Promise(res => setTimeout(function () { res(123) }, 2000))
}

function runThenFunction() {
    console.log("Enter then function")
    returnPromise(2000).then(res => {
        console.log(res);
        returnPromise(1000).then(res => {
            console.log(res);
        });
    });
    //You can log here and it will be displayed before the promise has been resolved
    console.log("Exit then function")
}

async function runAwaitFunction() {
    console.log("Enter await function")
    var firstStop = await returnPromise(1000);
    console.log(firstStop)
    var secondStop = await returnPromise(4000);
    console.log(secondStop)
    // Using await the code "stops" until promise is resolved
    console.log("Exit await function")
}

function returnPromise(time: number) {
    return new Promise(resolv => setTimeout(() => resolv("hello: " + time), time));
}

export default async function repos() {
    //@ts-ignore
    var res = await (await fetch('https://api.github.com/users/tik9/repos')).json()
    res = res.map(({ name, description }: { name: string, description: string }) => ({ name, description }))
    return res
}

export async function rate_limit() {
    var url = 'https://api.github.com/rate_limit'
    try { var res = (await axios.get(url)).data } catch (error) { console.log('err') }
    return res.resources.core
}


async function dic() {
    var Dictionary = require("oxford-dictionaries-api");
    var dict = new Dictionary("f6aa0186", process.env.oxford);

    var res = await dict.entries({ word_id: 'ace' })
    var lex_entry = res.results[0].lexicalEntries[0]
    var definition = lex_entry.entries[0].senses[0].definitions[0]
    var phrases = lex_entry.phrases[0].text
}
