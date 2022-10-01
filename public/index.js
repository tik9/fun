
index()
include_js()

function groupByKey(list, key) {
  return list.reduce((hash, { [key]: value, ...rest }) =>
    ({ ...hash, [value]: (hash[value] || []).concat({ ...rest }) }), {})
}

async function include_js() {
  var res = await css_js('js')
  includes_script(res)
  await sleep(100)
  git_code(res)
}

async function index() {
  var index = arguments.callee.name
  await indexfun(index)

  var res = await (await fetch(netfun + 'mongo?op=find&coll=' + index)).json()
  res = res.filter(val => val.cat.match(new RegExp(/further/)));

  var div = document.getElementById(index)
  res = res.map(obj => ({ ...obj, url: '#' + obj.name }))
  div.append(table(res, index))
  div.classList.add('mt-5')

  client()
  server()
  accounts(); apis(); commits(); convert(); issues_with_this_repo(); posts(); repos()
}

function locale_date(date) {
  var today = new Date()
  var dateformat = { day: '2-digit', month: '2-digit', year: 'numeric' }

  return date == today.toISOString().substring(0, 10) ? 'today' : new Date(today.setDate(today.getDate() - 1)).toISOString().substring(0, 10) == date ? 'yesterday' : new Date(date).toLocaleDateString('de-de', dateformat)
}


function navhelp(arr) {
  for (var elem of arr) {
    var aref = document.createElement('a')
    aref.textContent = elem
    aref.href = '#' + elem
    aref.classList.add('nav')
    topnav.append(aref)
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }


//# sourceURL=dynamicScript.js
