
// navtop_head()

var str = document.currentScript.src
var thisone = str.substring(str.lastIndexOf("/") + 1, str.length).split('.')[0]
// indexfun()
index()
include_js()

async function include_js() {
  var res = await css_js('js')
  includes_script(res)
  await sleep(100)
  git_code(res)
}

function groupByKey(list, key) {
  return list.reduce((hash, { [key]: value, ...rest }) =>
    ({ ...hash, [value]: (hash[value] || []).concat({ ...rest }) }), {})
}

async function index() {
  var index = arguments.callee.name
  await indexfun(index)
  var res = await (await fetch(netfun + 'mongo?para1=' + index)).json()
  // console.log(res)
  res = res.filter(val => val.category.match(new RegExp(/further-fun/)));

  var div = document.getElementById(index)
  res = res.map(obj => ({ ...obj, url: '#' + obj.name }))
  div.append(table(res, index))
  div.classList.add('mt-5')
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
