function aref(elem, val) {
    var aref = document.createElement('a')
    aref.textContent = dateformat.test(val) ? locale_date(val) : val
    aref.href = elem.url
    return aref
}

function table(arr, src) {

    var table_ = document.createElement('table')
    var thead = document.createElement('thead')
    var tr = document.createElement('tr')
    thead.appendChild(tr)
    var columns = []
    for (var key in arr[0]) {
        if (['_id', '__v', 'api', 'category', 'post_id', 'url', 'comments'].includes(key)) continue
        if (arr[0].hasOwnProperty(key) && !columns.includes(key)) {
            columns.push(key);
            // if (key == 'value') continue

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

            if (['commits', 'posts'].includes(src)) {
                if (elem2 === 'date') td.append(aref(elem, val))
                else td.innerHTML = val
            }

            else if (src === 'issues') {
                if (elem2 === 'title') td.append(aref(elem, val))
                else
                    td.innerHTML = (['updatedAt'].includes(elem2)) ? locale_date(val) : val
            }

            else if (['trepos', 'repos'].includes(src)) {
                if ('pushedAt' === elem2)
                    td.innerHTML = locale_date(val)

                // else if (elem2 === 'description')
                // td.append(aref(elem, val))
                // else if ('totalCount' === elem2) td.innerHTML = `${Math.floor(val / 1000)} K`
                else if ('Last commits' === elem2) {
                    for (let elem of val)
                        td.innerHTML += locale_date(elem.committedDate) + '<br>'
                }
                else td.innerHTML = val
            }

            tr.appendChild(td);
        }
        tbody.appendChild(tr)
    }
    table_.appendChild(tbody);
    table_.classList.add('table', 'table-bordered', 'table-striped', 'mt-4', 'mb-4')
    return table_;
}