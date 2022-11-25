
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

async function sys_client() {
    var client = arguments.callee.name
    var res = {}
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    res['browser width and height'] = width + ' x ' + height
    res.browser = navigator.userAgent;
    (await indexfun(client)).append(list(res, client))
}

async function sys_server() {
    // optional: show 1)info, 2)value, 3)category
    var server = arguments.callee.name
    var res = await (await fetch(net_fun + 'sys')).json();
    orderKeys(res);
    (await indexfun(server)).append(list(res, server))
}