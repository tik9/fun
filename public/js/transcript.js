
transcript()
async function transcript() {
    var url = 'https://api.assemblyai.com/v2/transcript'
    var audio = "https://bit.ly/3yxKEIY"
    var res = await (await fetch(url,
        {
            headers: { authorization: process.env.assembly },
            body: JSON.stringify({ audio_url: audio })
        })).json()
    res = res.id
    console.log(res)
    res = await fetch(url + '/' + id, {
        headers: { authorization: process.env.assembly },
    }
    )
    res = res.json()
}
