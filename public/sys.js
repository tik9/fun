
async function sys() {
    var res = await (await fetch('/.netlify/functions/sys')).json()
    console.log(res)
    // var res = await (await fetch(url, {headers:{'x-rapidapi-key': env,'x-rapidapi-host': host}}))
}
sys()