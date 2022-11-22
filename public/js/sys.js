
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

async function client() {
    var client = arguments.callee.name
    var res = {}
    res.browser = navigator.userAgent;
    res.date = new Date();
    // console.log(res);
    (await indexfun('info_about_' + client)).append(list(res, client))

}

async function server() {
    // optional: show 1)info, 2)value, 3)category
    var server = arguments.callee.name
    var res = await (await fetch(net_fun + 'sys')).json();
    orderKeys(res);
    (await indexfun('info_about_' + server)).append(list(res, server))
}