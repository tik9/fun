
sys()
async function sys() {
    var jstab = []
    var sys = arguments.callee.name
    var res = await (await fetch(netfun + 'mongo?op=find&coll=' + sys)).json()
    res = res.reduce((hash, { ['host']: value, ...rest }) =>
        ({ ...hash, [value]: (hash[value] || []).concat({ ...rest }) }), {})
    for (var key in res) {
        var arr = []
        for (var elem2 of res[key]) {
            var info = elem2.info
            var value = elem2.value
            var category = elem2.category
            arr.push({ category, info, value })
        }
        var head = document.createElement('h5')
        head.classList.add('mt-4')
        head.textContent = 'Host: ' + key

        var tab = table(arr, sys)
        jstab.push(tab);

        (await indexfun('server_system')).append(head, tab)
    }

    for (elem of jstab) { new JSTable(elem, { perPage: 5 }) }
}