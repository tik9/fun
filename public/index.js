
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

async function include_js() {
  for (var elem of await css_js('js')) {
    if (elem === 'js/tests.js') continue
    var script = document.createElement("script")
    script.src = elem
    // if (elem == 'js/ani.js') continue
    document.body.append(script)
  }
}

async function index() {
  // await indexfun()
  // await indexfun(alias_cloud)

  var index = arguments.callee.name;
  var res
  // res = (await (await fetch(net_fun + 'mongo?op=find&coll=' + index)).json()).filter(val => val.category === 'fun').map(obj => ({ ...obj, url: '#' + obj.name }));

  // var div = document.getElementById(index); div.append(table(res, index)); div.classList.add('mt-5')

  await sleep(500)
  lastfm()
  // accounts();
  // commits();
  // convert();
  // issues();
  // posts();
  // repos()
  // api();
  // sys_client()
  // sys_server()
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
  var elem = document.createElement('div')
  container.append(elem)
  elem.id = head
  var hIntro = document.createElement("h4");
  elem.prepend(hIntro)
  hIntro.innerHTML = (head[0].toUpperCase() + head.slice(1)).replace(/_/g, ' ')
  hIntro.classList.add('mt-5', 'mb-3');
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
    elem = elem[0].toUpperCase() + elem.slice(1)
    val = dateformat.test(val) ? locale_date(val) : val

    var li = document.createElement('li')

    if (elem === 'Location') li = li_aref(elem, val)
    else if (name === 'accounts') li = li_aref(elem, val)
    else if (name === 'git_code') {
      var text = val.slice(val.lastIndexOf('/') + 1)
      li = li_aref(text, gitBase + 'public/' + val)
    }
    else
      li.append(document.createTextNode(`${elem}: ${val}`))
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
