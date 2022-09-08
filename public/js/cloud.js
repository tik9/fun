
accounts()
commits()
repos()
issues_with_this_repo()

async function accounts() {
  await sleep(100)
  await indexfun('cloud')
  var res = await (await fetch(netfun + arguments.callee.name)).json()

  var div = helper(arguments.callee.name)
  div.append(list(res, arguments.callee.name))
}

async function commits() {
  var commits = arguments.callee.name
  var res = await (await fetch(netfun + commits)).json()
  res = res[0].node.target.history.edges
  var arr = []
  for (var elem of res) {
    var obj = {}
    for (var elem2 in elem.node) {
      var val = elem.node[elem2]
      if (elem2 == 'committedDate') {
        val = val.slice(0, 10)
        elem2 = 'date'
      } else if (elem2 == 'commitUrl') elem2 = 'url'

      obj[elem2] = val
    }
    arr.push(obj)
  }
  helper(commits).append(table(arr, commits))
}

function helper(sub) {
  var sup = 'cloud'
  var div = document.createElement('div')
  div.id = sub
  var sup = document.getElementById(sup)
  // console.log(1, sub, sup)
  var head = document.createElement('h5')
  if (sub != 'accounts') head.classList.add('mt-3',)
  head.classList.add('mb-3')
  head.textContent = sub[0].toUpperCase() + sub.slice(1).replace(/_/g, ' ')
  sup.append(head, div)
  return div
}

async function issues_with_this_repo() {
  var res = await (await fetch(netfun + 'issues')).json()
  var arr_field = ['title', 'body', 'url']
  var arr_date = ['createdAt', 'updatedAt']
  arr_field = arr_field.concat(arr_date)
  res = res.issues.edges

  var arr = []
  for (var elem of res) {
    var obj = {};
    for (var elem2 of arr_field) {
      var elem3 = elem2
      var val = elem.node[elem2]
      if (arr_date.includes(elem2)) {
        val = val.slice(0, 10)
        elem3 = elem2.slice(0, -2)
      }
      obj[elem3] = val
    }
    arr.push(obj)
  }
  helper(arguments.callee.name).append(table(arr, 'issues'))
}

async function repos() {
  var repos = arguments.callee.name
  var res = await (await fetch(netfun + repos)).json()
  helper(repos).append(table(res, repos))
}