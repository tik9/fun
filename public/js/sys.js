
function orderKeys(obj) {
    var keys = Object.keys(obj).sort((k1, k2) => {
        if (k1 < k2) return -1;
        else if (k1 > k2) return +1;
        else return 0;
    });

    var helpArr = {};
    for (var elem of keys) {
        helpArr[elem] = obj[elem];
        delete obj[elem];
        obj[elem] = helpArr[elem]
    }
    return obj;
}

var arr = ['date', 'hostname', 'ip', 'loc', 'org', 'postal', 'tik']
async function client() {
    var client = arguments.callee.name
    var res = await (await fetch(netfun + 'sys')).json()
    arr_client = ['architecture', "cores", 'free memory', 'host_server', 'memory', 'node', 'npm_version', 'os', 'platform', 'release', 'speed cpu mhz', ...arr].forEach(e => delete res[e]);
    res.userAgent = navigator.userAgent;
    orderKeys(res);
    (await indexfun('info_about_' + client)).append(list(res, client))
}

async function server() {
    var server = arguments.callee.name
    var res = await (await fetch(netfun + 'sys')).json()
    arr_server = ['city', 'client_map', 'country', 'region', 'timezone', ...arr].forEach(e => delete res[e]);
    (await indexfun('info_about_' + server)).append(list(res, server))
}