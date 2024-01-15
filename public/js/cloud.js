
async function commits() {
  var commits = arguments.callee.name
  var arr = await (await fetch(net_fun + commits)).json()
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
  var div = document.createElement('div')

  div.id = commits
  var head = document.createElement('h5')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = commits[0].toUpperCase() + commits.slice(1)
  document.getElementById('cloud').append(head, div)
  div.append(table(res, commits))
}

async function posts() {
  var posts = arguments.callee.name
  var res = await (await fetch(net_fun + posts)).json()
  // console.log(res)
  var div = document.createElement('div')

  div.id = posts
  var head = document.createElement('h5')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = posts[0].toUpperCase() + posts.slice(1)
  document.getElementById('cloud').append(head, div)
  div.append(table(res, posts))
  // console.log(res)
}

async function repos() {
  var repos = arguments.callee.name
  var res = await (await fetch(net_fun + repos)).json()
  // console.log(res)
  var div = document.createElement('div')

  div.id = repos
  var head = document.createElement('h5')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = repos[0].toUpperCase() + repos.slice(1)
  document.getElementById('cloud').append(head, div)
  div.append(table(res, repos))
}

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
    if (name == 'stack')
      res = Object.values(res.items)[0]

    obj[name] = res[elem.link]
  }

  helper(arguments.callee.name).append(list(obj, arguments.callee.name))
}


async function issues() {
  var arr_field = ['updatedAt', 'title', 'body', 'url', 'state']

  var arr = []
  for (var elem of await (await fetch(net_fun + 'issues?repo=fun')).json()) {
    var obj = {};
    for (var elem2 of arr_field) {
      var val = elem.node[elem2]
      if ('updatedAt' === elem2) {
        val = val.slice(0, 10)
        elem2 = 'updated'
      } else if (elem2 === 'state') val = val.toLowerCase()
      else if (elem2 === 'body') {
        val = await (await fetch(net_fun + 'utils', {
          method: "post", body: JSON.stringify({ type: "truncate", val: val, cut: 150 })
        })).json()
      }
      obj[elem2] = val
    }
    arr.push(obj)
  }
  helper(arguments.callee.name).append(table(arr, 'issues'))
}