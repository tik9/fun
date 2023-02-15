
async function lastfm() {
    var last = arguments.callee.name
    var res = await (await fetch(net_fun + last + '?artist=cher')).json()
    (await indexfun(last)).append(list(res, last))

    // console.log(res)
}