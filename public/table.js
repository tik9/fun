
function aref(elem, val) {
    var aref = document.createElement('a')
    aref.textContent = dateformat.test(val) ? locale_date(val) : val
    aref.href = elem.url
    return aref
}

function table(arr = [], src) {
    var table_ = document.createElement('table')
    var thead = document.createElement('thead')
    var tr = document.createElement('tr')
    thead.appendChild(tr)
    var columns = []
    for (var key in arr[0]) {
        if (['_id', '__v', 'api', 'category', 'name', 'url'].includes(key)) continue
        if (arr[0].hasOwnProperty(key) && !columns.includes(key)) {
            columns.push(key);
            if (key == 'value') continue

            var th = document.createElement('th')
            th.appendChild(document.createTextNode(key[0].toUpperCase() + key.slice(1)));
            tr.appendChild(th);
        }
    }
    table_.appendChild(thead);
    var tbody = document.createElement('tbody');
    for (var elem of arr) {
        var tr = document.createElement('tr')

        for (var elem2 of columns) {
            var val = elem[elem2]
            var td = document.createElement('td');

            if (src == 'index') {
                if (elem2 == 'title') {
                    var ahref = document.createElement('a')
                    ahref.href = '#' + elem.name
                    ahref.textContent = val
                    td.append(ahref)
                }
                else if (elem2 != 'name') td.innerHTML = val
            }
            else if (src == 'apis') {
                if (elem2 == 'description') td.append(aref({ url: '#' + elem.api }, val))
            }
            else if (['commits', 'posts'].includes(src)) {
                if (elem2 == 'date') td.append(aref(elem, val))
                else td.innerHTML = val
            }

            else if (src == 'issues') {
                if (elem2 == 'title') td.append(aref(elem, val))
                else
                    td.innerHTML = (['created', 'updated'].includes(elem2)) ? locale_date(val) : val
            }
            else if (src == 'joke') td.append(aref(elem, elem.value))

            else if (src == 'repos') {
                if (['date'].includes(elem2))
                    td.innerHTML = (elem2 == 'date') ? locale_date(val) : val

                else if (elem2 == 'repo') {
                    var ahref = document.createElement('a')
                    ahref.href = git + elem.repo
                    ahref.textContent = val
                    td.append(ahref)
                }
                else if (elem2 == 'description')
                    td.append(aref(elem, val))
            }

            else td.innerHTML = val
            tr.appendChild(td);
        }
        tbody.appendChild(tr)
    }
    table_.appendChild(tbody);
    table_.classList.add('table', 'table-bordered', 'table-striped', 'mt-4', 'mb-4')
    return table_;
}
table()