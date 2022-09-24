
var arr = ['date', 'hostname', 'ip', 'loc', 'org', 'postal', 'tik']
client()
async function client() {
    var client = arguments.callee.name
    var res = await (await fetch(netfun + 'sys')).json()
    arr_client = ['architecture', "cores", 'free memory', 'host_server', 'memory', 'node', 'npm', 'os', 'platform', 'release', 'speed cpu mhz', ...arr]
    arr_client.forEach(e => delete res[e]);
    // var { date, hostname, ip, loc, org, postal, tik, ...res } = res;
    (await indexfun('info_about_' + client)).append(list(res, client))
}

server()
async function server() {
    var server = arguments.callee.name
    var res = await (await fetch(netfun + 'sys')).json()
    arr_server = ['city', 'client_map', 'country', 'region', 'timezone', ...arr]
    arr_server.forEach(e => delete res[e]);
    (await indexfun('info_about_' + server)).append(list(res, server))
}