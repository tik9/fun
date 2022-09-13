
client()
async function client() {
    var client = arguments.callee.name
    var res = await (await fetch(netfun + client)).json()
    // console.log(res)
    var { ip, hostname, loc, postal, org, date, ...res } = res;
    (await indexfun('info_about_' + client)).append(list(res, client))
}