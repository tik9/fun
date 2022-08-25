
// sys()

async function sys() {
    // var a = table([{ 1: 2 }], '1')
    var jstab = []
    var sys = arguments.callee.name
    var res = []
    // var res = JSON.parse(JSON.stringify(await getjson(), ['host', 'category', 'info', 'value']))
    // console.log(res)
    res = groupByKey(res, 'host')
    // res = (res[Object.keys(res)[0]])
    for (var key in res) {
        var arr = []
        for (var elem2 of res[key]) {
            var info = elem2.info
            var value = elem2.value
            var category = elem2.category
            arr.push({ category, info, value })
        }
        var head = document.createElement('h5')
        head.classList.add('mt-5')
        head.textContent = 'Host: ' + key

        var tab = table(arr, sys)
        jstab.push(tab)

        document.getElementById(sys).append(head, tab)
    }

    for (elem of jstab) { new JSTable(elem, { perPage: 5 }) }
}