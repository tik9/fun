
// sys()
async function sys() {
    var jstab = []
    var sys = arguments.callee.name
    var res = await (await fetch(netfun + 'mongo?op=find&coll=' + sys)).json()
    for (var elem of res) {
    }
    var head = document.createElement('h5')
    head.classList.add('mt-4')
    head.textContent = 'Host: ' + key

    var tab = table(arr, sys)
    jstab.push(tab);

    (await indexfun('server_system')).append(head, tab)

    for (elem of jstab) { new JSTable(elem, { perPage: 5 }) }
}