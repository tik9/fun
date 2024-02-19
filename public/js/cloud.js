
async function repos() {
  let repos = arguments.callee.name
  let res = await (await fetch(net_fun + repos)).json()
  let div = document.createElement('div')

  div.id = repos
  let head = document.createElement('h4')
  head.classList.add('mt-4', 'mb-3')
  head.textContent = `Github ${repos} I watch`
  document.getElementById('cloud').append(head, div)
  let ol = document.createElement('ol')
  for (let i = 0; i < res.length; i++) {
    let elem = res[i]
    let li = document.createElement('li')
    li.id = elem.name
    li.style.marginBottom = '25px'
    ol.appendChild(li)
    li.innerHTML = `<h5>${elem.name[0].toUpperCase() + elem.name.slice(1)}</h5>
    ${elem.description}<br><br>
    <b>Commits</b>`
    for (let i = 0; i < elem.commits.length; i++) {
      let elem2 = elem.commits[i]
      let msg = elem2.message.slice(0, 50)
      msg = msg.slice(0, msg.lastIndexOf(" "))
      let elem_name = elem.name.toLowerCase()
      let comm = document.createElement('div')
      comm.innerHTML = `<br>${elem2.date}:<br>${msg}`
      comm.id = `${elem_name}${i}`
      comm.style.display = 'inline'
      let btn = document.createElement('button')
      btn.id = `${elem_name}${i}`
      btn.innerHTML = 'Read more'
      btn.classList.add('btn', 'btn-info')
      let dots = document.createElement('span')
      dots.innerHTML = '...<br>'
      dots.id = 'dots'
      // btn.addEventListener('click', (event) => {
      //   console.log(1, event)
      //   if (dots.style.display === "none") {
      //     dots.style.display = "inline";
      //     btn.innerHTML = "Read more";
      //     comm.style.display = "none";
      //   } else {
      //     dots.style.display = "none";
      //     btn.innerHTML = "Read less";
      //     comm.style.display = "inline";
      //   }
      // })

      li.append(comm, dots, btn)
      // console.log(btn)
    }

    li.innerHTML += '<br>'
  }

  let list_ = document.getElementsByClassName('btn')
  console.log(Array.from(list_))
  // document.addEventListener("DOMContentLoaded", function (e) {
  //   console.log(3, list_)
  //   for (let elem of list_) {
  //     console.log(12, elem.id)
  //   }
  // });

  // document.getElementById('freecodecamp0').addEventListener('click', (event) => { console.log(12) })
  div.append(ol)
}

function testit() {
  let vis = document.createElement('div')
  vis.textContent = 123

  let btnText = document.createElement('button')
  btnText.id = 'myBtn'
  btnText.innerHTML = 'Read more'
  btnText.addEventListener('click', () => {
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  })
  let dots = document.createElement('div')
  dots.textContent = '...'
  dots.id = 'dots'

  let moreText = document.createElement('div')
  moreText.id = 'more'
  moreText.textContent = 456
  moreText.style.display = 'none'


  document.getElementById('cloud').append(vis, dots, moreText, btnText)
}

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