
async function mongo() {
    var res = await (await fetch('/.netlify/functions/mongo')).json()
    console.log(res)
    // var res = await (await fetch(url, {headers:{'x-rapidapi-key': env,'x-rapidapi-host': host}}))
}
mongo()
