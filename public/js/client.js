
client()
async function client() {
    var client = arguments.callee.name
    var res = await (await fetch(netfun + client)).json()
    var { date, hostname, host_name, ip, loc, org, postal, tik, ...res } = res;
    (await indexfun('info_about_' + client)).append(list(res, client))
}