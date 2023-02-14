
async function lastfm() {
    var last = arguments.callee.name
    var res = await (await fetch(net_fun + last + '?artist=cher')).json()
    res.img = res.image[0]['#text'];
    res = (({ name, img, mbid, url }) => ({ name, img, mbid, url }))(res);
    (await indexfun(last)).append(list(res, last))

    // console.log(res)
}