
async function fetcher() {
    var res = await (await fetch('/.netlify/functions/')).json()
    console.log(res)
}
fetcher()
