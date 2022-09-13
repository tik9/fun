
var alias_cloud = 'social_cloud'

accounts()
commits()
issues_with_this_repo()
posts()
repos()

async function accounts() {
  await indexfun(alias_cloud)
  var res = await (await fetch(netfun + arguments.callee.name)).json()

  var div = helper(arguments.callee.name)
  div.append(list(res, arguments.callee.name))
}

async function commits() {
  var commits = arguments.callee.name
  var arr = await (await fetch(netfun + commits)).json()
  var res = []
  for (var elem of arr) {
    var obj = {}
    for (var elem2 in elem.node) {
      var val = elem.node[elem2]
      if (elem2 == 'committedDate') {
        val = val.slice(0, 10)
        elem2 = 'date'
      } else if (elem2 == 'commitUrl') elem2 = 'url'

      obj[elem2] = val
    }
    res.push(obj)
  }
  helper(commits).append(table(res, commits))
}

function helper(sub) {
  var div = document.createElement('div')
  div.id = sub
  var head = document.createElement('h5')
  head.classList.add('mt-3', 'mb-3')
  head.textContent = sub[0].toUpperCase() + sub.slice(1).replace(/_/g, ' ')
  document.getElementById(alias_cloud).append(head, div)
  return div
}

async function issues_with_this_repo() {
  var arr_field = ['title', 'body', 'url']
  var arr_date = ['createdAt', 'updatedAt']
  arr_field = arr_field.concat(arr_date)

  var arr = []
  for (var elem of await (await fetch(netfun + 'issues')).json()) {
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

async function posts() {
  var posts = arguments.callee.name
  helper(posts).append(table(await (await fetch(netfun + posts)).json(), posts))
}

async function repos() {
  var repos = arguments.callee.name
  var res = await (await fetch(netfun + repos)).json()
  helper(repos).append(table(res, repos))
}