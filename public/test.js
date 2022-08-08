

var host = 'https://google-translate1.p.rapidapi.com'
var url = host + '/language/translate/v2/languages'
// url = 'https://pokeapi.co/api/v2/pokedex/kanto'

async function test() {
    var env = await (await fetch('/getenv')).json()
    // console.log(env)
    var res = await (await fetch(url, {
        //@ts-ignore
        headers:
        {
            'x-rapidapi-ua': 'RapidAPI-Playground',
            'x-rapidapi-key': env,
            'x-rapidapi-host': host
        }
    }))
    console.log(12, res)
}
test()

async function test() {
    var res = await (await fetch('/.netlify/functions/test'))
    console.log(res)
}

test()