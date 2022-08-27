
accounts()
// commits_repos()
posts()

async function accounts() {
  var neturl = '/.netlify/functions/mongo'
  var collreq = '?coll='
  try {
    var accounts = helper(arguments.callee.name)

    var res = await (await fetch(neturl + collreq + arguments.callee.name)).json()
    res = groupByKey(res, 'provider')
    for (var elem in res) {
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


async function posts() {
  var neturl = '/.netlify/functions/mongo'
  var collreq = '?coll='

  try {
    var res = await (await fetch(neturl + collreq + arguments.callee.name)).json()
    helper(arguments.callee.name).append(table(res, 'posts',))
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
  var head = document.createElement('h5')
  if (elem != 'accounts') head.classList.add('mt-5',)
  head.classList.add('mb-3')
  head.textContent = elem[0].toUpperCase() + elem.slice(1)
  clouddiv.append(head, div)
  return div
}
