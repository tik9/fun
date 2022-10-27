
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
  var anijs = 'AniJS/0.9.3/'
  var arr = await css_js('js')
  arr.push(cdn + anijs + 'anijs-min.js',
    cdn + anijs + 'helpers/dom/anijs-helper-dom-min.js')

  for (var elem of arr) {
    var script = document.createElement("script")
    script.src = elem
    // console.log(elem)
    if (elem == 'js/jstable.js') continue
    document.body.append(script)
  }
  // var script = document.createElement("script")
  // script.src = 'js/jstable.js'
  // document.body.append(script)
  // await sleep(100);git_code(res)
}

async function index() {
  await indexfun()
  await indexfun(alias_cloud)

  var index = arguments.callee.name; var res = (await (await fetch(netfun + 'mongo?op=find&coll=' + index)).json()).filter(val => val.category.match(new RegExp(/further$/))).map(obj => ({ ...obj, url: '#' + obj.name }));
  var div = document.getElementById(index); div.append(table(res, index)); div.classList.add('mt-5')

  await sleep(400)
  // accounts();
  ani()
  // api();
  // client()
  // commits();
  // convert();
  // issues_with_this_repo();
  // posts();
  // repos()
  // server()
}

async function indexfun(head = 'index') {
  var aHref = document.createElement("a");
  aHref.textContent = (head[0].toUpperCase() + head.slice(1)).replace(/_/g, ' ')
  aHref.classList.add('nav')
  aHref.href = '#' + head
  topnav.append(aHref)
  if (head == 'index') {
    aHref.classList.add('active', 'nav')
    aHref.href = '#container'
  }
  // else {
  var elem = document.createElement('div')
  container.append(elem)
  elem.id = head
  var hIntro = document.createElement("h4");
  elem.prepend(hIntro)
  hIntro.innerHTML = (head[0].toUpperCase() + head.slice(1)).replace(/_/g, ' ')
  hIntro.classList.add('mt-5', 'mb-3');
  // }
  return elem
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

    if (name == 'client' && elem == 'map') li = li_aref('Map', val)
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
