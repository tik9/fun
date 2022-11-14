
async function accounts() {
  var cloud_arr = [
    {
      name: "stack", url:
        'https://api.stackexchange.com/2.2/users/1705829?site=stackoverflow',
      link: 'link'
    },
    { name: "git", url: 'https://api.github.com/users/tik9', link: 'html_url' }
  ]
  var obj = {}
  for (var elem of cloud_arr) {
    var res = await (await fetch(elem.url)).json()
    let name = elem.name
    if (name == 'stack') {
      res = Object.values(res.items)[0]
    }
    obj[name] = res[elem.link]
  }

  helper(arguments.callee.name).append(list(obj, arguments.callee.name))
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
  var arr_field = ['updatedAt', 'title', 'body', 'url', 'state']

  var arr = []
  for (var elem of await (await fetch(netfun + 'issues')).json()) {
    var obj = {};
    for (var elem2 of arr_field) {
      var val = elem.node[elem2]
      if ('updatedAt' == elem2) {
        val = val.slice(0, 10)
        elem2 = 'updated'
      } else if (elem2 == 'state') val = val.toLowerCase()
      obj[elem2] = val
    }
    arr.push(obj)
  }
  helper(arguments.callee.name).append(table(arr, 'issues'))
}

async function posts() {
  var posts = arguments.callee.name
  var res = await (await fetch(net_fun + posts)).json()
  helper(posts).append(table(res, posts))
}

async function repos() {
  var repos = arguments.callee.name
  var res = await (await fetch(netfun + repos)).json()
  helper(repos).append(table(res, repos))
}