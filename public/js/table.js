
function aref(elem, val) {
    var aref = document.createElement('a')
    aref.textContent = dateformat.test(val) ? locale_date(val) : val

    aref.href = elem.url
    return aref
}

function table(arr = [], src) {
    var excludes = ['_id', '__v', 'cat', 'url', 'page', 'api']
    var table_ = document.createElement('table')
    var columns = []
    var thead = document.createElement('thead')
    var tr = document.createElement('tr')
    thead.appendChild(tr)
    for (var elem of arr) {
        for (var key in elem) {
            if (excludes.includes(key)) continue
            if (elem.hasOwnProperty(key) && !columns.includes(key)) {
                columns.push(key);

                var th = document.createElement('th')
                th.appendChild(document.createTextNode(key[0].toUpperCase() + key.slice(1)));
                tr.appendChild(th);
            }
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
                    ahref.href = '#' + elem.page
                    ahref.textContent = val
                    td.append(ahref)
                }
                else if (elem2 != 'page') td.innerHTML = val
            }
            else if (src == 'repos') {
                if (['date', 'stars', 'description'].includes(elem2)) {
                    td.innerHTML = (elem2 == 'date') ? locale_date(val) : val
                }
                else if (elem2 == 'repo') {
                    var ahref = document.createElement('a')
                    ahref.href = git + elem.repo
                    ahref.textContent = val
                    td.append(ahref)
                }
            }
            else if (['commits', 'posts'].includes(src)) {
                if (elem2 == 'date') td.append(aref(elem, val))
                else td.innerHTML = val
            }
            else if (src == 'tests') {
                if (['lines', 'ext', 'date'].includes(elem2)) {
                    td.innerHTML = (elem2 == 'date') ? locale_date(val) : val
                }
                else {
                    var ahref = document.createElement('a')
                    ahref.href = ghBase + '/test/' + val
                    ahref.textContent = val
                    td.append(ahref)
                }
            }
            else if (src == 'apis') {
                if (elem2 == 'description') td.append(aref({ url: '#' + elem.api }, val))
            }
            else if (src == 'joke') td.append(aref(elem, elem.value))
            else if (src == 'issues') {
                if (elem2 == 'title') {
                    td.append(aref(elem, val))
                    // console.log(elem)
                }
                td.innerHTML = (elem2 == 'createdAt') ? locale_date(val) : val
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