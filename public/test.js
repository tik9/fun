
async function test() {
    var res = await (await fetch('/.netlify/functions/test'))
    console.log(res)
}

test()