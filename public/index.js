
index()
include_js()

var alias_cloud = 'social_cloud'
var dateformat = /^\d{4}-\d{2}-\d{2}/
var git = github + 'tik9/'
var git2 = git + 'fun'
var gitBase = git2 + '/blob/main/'

async function git_code(arr) {
  ghUlLinks = list(arr, arguments.callee.name)
  var ghDivLink = document.createElement('div')
  var head = document.createElement('h5')
  head.textContent = 'Links'
  container.append(ghDivLink)
  ghDivLink.id = arguments.callee.name
  ghDivLink.classList.add('mb-4', 'mt-4')
  ghDivLink.append(head, ghUlLinks);
}

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
  await indexfun(alias_cloud)

  var res = []
  res = await (await fetch(netfun + 'mongo?op=find&coll=' + index)).json()
  res = res.filter(val => val.cat.match(new RegExp(/further/)));
  res = res.map(obj => ({ ...obj, url: '#' + obj.name }))

  var div = document.getElementById(index)
  div.append(table(res, index))
  div.classList.add('mt-5')

  // await sleep(500)
  // accounts();
  // apis();
  client()
  // commits();
  // convert();
  issues_with_this_repo();
  posts();
  repos()
  // server()
}

function li_aref(text, href) {
  var aref = document.createElement('a')
  aref.textContent = text
  aref.href = href
  var li = document.createElement('li')
  li.append(aref)
  return li
}

function list(arr, name) {
  var ul = document.createElement('ul')
  for (var elem in arr) {
    var val = arr[elem]
    val = dateformat.test(val) ? locale_date(val) : val

    var li = document.createElement('li')
    if (name == 'symbols') {
      li.style.display = 'inline-block'
      li.classList.add('me-3')
      li.append(document.createTextNode(`${elem.replace('_', ' ')}: ${val}`))
    }
    else if (name == 'client' && elem == 'map') li = li_aref('Map', val)
    else if (name == 'accounts') li = li_aref(elem, val)
    else if (name == 'git_code') {
      var text = val.slice(val.lastIndexOf('/') + 1)
      li = li_aref(text, gitBase + 'public/' + val)
    }
    else
      li.append(document.createTextNode(`${elem.replace('_', ' ')}: ${val}`))
    ul.appendChild(li)
  }
  return ul
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
