
accounts()
// commits_repos()
// posts()

async function accounts() {
  var neturl = '/.netlify/functions/mongo'
  try {
    var accounts = helper(arguments.callee.name)

    var res = await (await fetch(neturl + '?coll=' + arguments.callee.name)).json()
    res = groupByKey(res, 'provider')
    for (var elem in groupByKey(res, 'provider')) {
      var val = res[elem][0]
      var sub = document.createElement('a')
      sub.textContent = elem[0].toUpperCase() + elem.slice(1)
      if (elem != 'netlify') sub.href = 'https://' + val.url

      var ul = {}
      for (var elem2 in val) {
        if (elem2 != 'url') ul[elem2] = val[elem2]
      }
      accounts.append(sub, list(ul))
    }
  } catch (error) { console.log(error) }
}

async function commits_repos() {
  for (var elem of ['commits', 'repos']) {
    try {
      var comm_rep = document.createElement('div')
      var clouddiv = document.getElementById('cloud')
      clouddiv.append(comm_rep)
      comm_rep.id = elem
      comm_rep.append(table((await getjson(elem)).slice(0, 5), elem))
    } catch (error) { console.log(error) }
  }
}

function helper(elem) {
  var div = document.createElement('div')
  div.id = elem
  var clouddiv = document.getElementById('cloud')
  clouddiv.append(div)
  return div
}

async function posts() {
  try {
    var res = []
    // var res = await (await fetch('/.netlify/functions/file?json=' + arguments.callee.name)).json()
    // console.log(1, res)
    var posts = helper(arguments.callee.name)

    for (var elem of [0, 1]) {
      var h5 = document.createElement('h5')
      h5.classList.add('mt-5', 'mb-3')
      var head = res[elem][0].cat
      h5.appendChild(document.createTextNode(head[0].toUpperCase() + head.slice(1)))
      posts.append(h5, table(res[elem], 'posts',))
    }
  } catch (error) { console.log(error) }
}