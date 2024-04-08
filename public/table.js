function aref(elem, val) {
    let aref = document.createElement('a')
    aref.textContent = val
    aref.href = elem.url
    return aref
}

function table(arr, src) {

    let table_ = document.createElement('table')
    let thead = document.createElement('thead')
    let tr = document.createElement('tr')
    thead.append(tr)
    let columns = []
    for (let key in arr[0]) {
        if (['_id', '__v', 'post_id', 'url'].includes(key)) continue
        if (arr[0].hasOwnProperty(key) && !columns.includes(key)) {
            columns.push(key);

            let th = document.createElement('th')
            th.append(document.createTextNode(key[0].toUpperCase() + key.slice(1)));
            tr.append(th);
        }
    }

    table_.append(thead);
    let tbody = document.createElement('tbody');
    for (let elem of arr) {
        let tr = document.createElement('tr')

        for (let elem2 of columns) {
            let val = elem[elem2]
            if (val === undefined) continue

            let td = document.createElement('td');
            if (elem2 === 'date')
                td.append(aref(elem, val))
            else td.textContent = val

            tr.append(td);
        }
        tbody.append(tr)
    }
    table_.append(tbody);
    table_.classList.add('table', 'table-bordered', 'table-striped', 'mt-4', 'mb-4')
    return table_;
}