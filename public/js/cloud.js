
async function repos() {
  let repos = arguments.callee.name
  let res = await (await fetch(net_fun + repos)).json()
  // console.log(res)
  let div = document.createElement('div')

  div.id = repos
  let head = document.createElement('h5')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = `${repos[0].toUpperCase()}${repos.slice(1)} I watch`
  document.getElementById('cloud').append(head, div)
  div.append(table(res, repos))
}

async function commits() {
  let commits = arguments.callee.name
  let arr = await (await fetch(net_fun + commits)).json()
  let res = []
  for (let elem of arr) {
    let obj = {}
    for (let elem2 in elem.node) {
      let val = elem.node[elem2]
      if (elem2 == 'committedDate') {
        val = val.slice(0, 10)
        elem2 = 'date'
      } else if (elem2 == 'commitUrl') elem2 = 'url'

      obj[elem2] = val
    }
    res.push(obj)
  }
  let div = document.createElement('div')

  div.id = commits
  let head = document.createElement('h5')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = commits[0].toUpperCase() + commits.slice(1)
  document.getElementById('cloud').append(head, div)
  div.append(table(res, commits))
}

async function posts() {
  let posts = arguments.callee.name
  let res = await (await fetch(net_fun + posts)).json()
  let div = document.createElement('div')

  div.id = posts
  let head = document.createElement('h5')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = posts[0].toUpperCase() + posts.slice(1)
  document.getElementById('cloud').append(head, div)
  div.append(table(res, posts))
}

async function trepos() {
  let repos = arguments.callee.name
  let res = await (await fetch(net_fun + repos)).json()
  let div = document.createElement('div')

  div.id = repos
  let head = document.createElement('h5')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = 'Github repos I own'
  document.getElementById('cloud').append(head, div)
  div.append(table(res, repos))
}

async function accounts() {
  let accounts = arguments.callee.name
  let cloud_arr = [
    {
      name: "stack", url:
        'https://api.stackexchange.com/2.2/users/1705829?site=stackoverflow',
      link: 'link'
    },
    { name: "git", url: 'https://api.github.com/users/tik9', link: 'html_url' }
  ]
  let obj = {}
  for (let elem of cloud_arr) {
    let res = await (await fetch(elem.url)).json()
    let name = elem.name
    if (name == 'stack')
      res = Object.values(res.items)[0]

    obj[name] = res[elem.link]
  }

  let div = document.createElement('div')

  div.id = accounts
  let head = document.createElement('h5')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = accounts[0].toUpperCase() + accounts.slice(1)
  document.getElementById('cloud').append(head, div)

  div.append(list(obj, accounts))
}


async function issues() {
  let issues = arguments.callee.name

  let arr_field = ['updatedAt', 'title', 'body', 'url', 'state']

  let arr = []
  for (let elem of await (await fetch(net_fun + 'issues?repo=fun')).json()) {
    let obj = {};
    for (let elem2 of arr_field) {
      let val = elem.node[elem2]
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

  let div = document.createElement('div')

  div.id = issues
  let head = document.createElement('h5')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = issues[0].toUpperCase() + issues.slice(1)
  document.getElementById('cloud').append(head, div)

  div.append(table(arr, 'issues'))
}