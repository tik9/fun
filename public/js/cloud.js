
async function trepos() {
  let repos = arguments.callee.name
  let res = await (await fetch(net_fun + repos)).json()
  let div = document.createElement('div')

  div.id = repos
  let head = document.createElement('h4')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = 'Github repos I own'
  document.getElementById('cloud').append(head, div)
  div.append(table(res, repos))
}

async function repos() {
  let repos = arguments.callee.name
  let res = await (await fetch(net_fun + repos)).json()
  let div = document.createElement('div')

  div.id = repos
  let head = document.createElement('h4')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = `Github ${repos} I watch`
  document.getElementById('cloud').append(head, div)
  var ol = document.createElement('ol')
  for (let i = 0; i < res.length; i++) {
    let elem = res[i]
    let span = document.createElement('span')
    span.id = 'name_des_' + elem.name
    let li = document.createElement('li')
    li.style.marginBottom = '25px'
    li.append(span)
    ol.appendChild(li)
    span.innerHTML = `<h5>${elem.name[0].toUpperCase() + elem.name.slice(1)}</h5>
    ${elem.description}<br><br>
    <b>Commits</b>`
    for (let i = 0; i < elem.commits.length; i++) {
      let elem2 = elem.commits[i]
      let span_comm = document.createElement('span')
      li.append(span_comm)
      ol.appendChild(li)
      span_comm.innerHTML = `${elem2.date}:<br>${elem2.message}<br>`
      span_comm.id = `commit_${elem.name}_${i}`
      console.log(span_comm.id)
    }
    console.log(span.id)
    span.innerHTML += '<br>'
  }
  div.append(ol)
}

async function commits() {
  let commits = arguments.callee.name
  let res = await (await fetch(net_fun + commits)).json()
  let div = document.createElement('div')

  div.id = commits
  let head = document.createElement('h4')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = `My ${commits}`
  document.getElementById('cloud').append(head, div)
  div.append(table(res, commits))
}

async function posts() {
  let posts = arguments.callee.name
  let res = await (await fetch(net_fun + posts)).json()
  let div = document.createElement('div')

  div.id = posts
  let head = document.createElement('h4')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = `My ${posts}`
  document.getElementById('cloud').append(head, div)
  div.append(table(res, posts))
}


async function issues() {
  let issues = arguments.callee.name

  let res = await (await fetch(net_fun + issues)).json()
  let div = document.createElement('div')

  div.id = issues
  let head = document.createElement('h4')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = `My ${issues}`
  document.getElementById('cloud').append(head, div)

  div.append(table(res, issues))
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
  let head = document.createElement('h4')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = accounts[0].toUpperCase() + accounts.slice(1)
  document.getElementById('cloud').append(head, div)

  div.append(list(obj, accounts))
}