
includes()
navtop_head()


function groupByKey(list, key) {
  return list.reduce((hash, { [key]: value, ...rest }) =>
    ({ ...hash, [value]: (hash[value] || []).concat({ ...rest }) }), {})
}

function helper(sub, sup = 'cloud') {
  var div = document.createElement('div')
  div.id = sub
  var sup = document.getElementById(sup)
  var head = document.createElement('h5')
  if (sub != 'accounts') head.classList.add('mt-3',)
  head.classList.add('mb-3')
  head.textContent = sub[0].toUpperCase() + sub.slice(1).replace(/_/g, ' ')
  sup.append(head, div)
  return div
}

async function includes() {
  var arr = await css_js('js')
  arr.sort()
  git_code(arr)
  includes_load(arr)
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

function navtop_head() {
  var aref = document.createElement("a");
  aref.classList.add('nav', 'active')
  aref.href = '#container';
  aref.textContent = 'Index'
  topnav.append(aref)

  var arr = []
  var headers = { apis: 'Apis I favour', client: 'Infos on client', cloud: 'Social cloud actvities', sys: 'Node server in use' }
  for (var elem in headers) {
    var div = document.createElement(elem)
    container.append(div)
    div.classList.add('mt-4')
    arr.push(elem)
    var head = document.createElement('h4')
    head.innerText = headers[elem]
    head.classList.add('mt-5')
    div.prepend(head)
  }

  for (var elem of arr) {
    var aref = document.createElement('a')
    aref.textContent = elem
    aref.href = '#' + elem
    aref.classList.add('nav')
    topnav.append(aref)
  }
  container.prepend(topnav)
}

//# sourceURL=dynamicScript.js
