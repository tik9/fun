
// accounts()
comm_posts_repo()
issues_with_this_repo()

async function issues_with_this_repo() {
  var res = await (await fetch(grap())).json()
  // var total = res.totalCount
  var issues = res.edges

  var arr = []
  for (var elem of issues) {
    var obj = {};
    for (var elem2 of ['body', 'createdAt', 'title', 'url']) {
      var val = elem.node[elem2]
      if (elem2 == 'createdAt') val = elem.node.createdAt.slice(0, 10)
      obj[elem2] = val
    }
    arr.push(obj)
  }
  // console.log(arr);

  helper(arguments.callee.name).append(table(arr, 'issues'))
}

async function accounts() {
  try {
    var res = await (await fetch(mon() + arguments.callee.name)).json()
    res = groupByKey(res, 'provider')
    var title = helper(arguments.callee.name)
    for (var elem in res) {
      var val = res[elem][0]
      var sub = document.createElement('a')
      sub.textContent = elem[0].toUpperCase() + elem.slice(1)
      if (elem != 'netlify') sub.href = 'https://' + val.url

      var ul = {}
      for (var elem2 in val) {
        if (elem2 != 'url') ul[elem2] = val[elem2]
      }
      title.append(sub, list(ul))
    }
  } catch (error) { console.log(error) }
}

async function comm_posts_repo() {
  try {
    for (var elem of ['commits', 'posts', 'repos']) {
      var res = await (await fetch(mon() + elem)).json()
      helper(elem).append(table(res, elem))
    }
  } catch (error) { console.log(error) }
}


function helper(elem) {
  var div = document.createElement('div')
  div.id = elem
  var clouddiv = document.getElementById('cloud')
  var head = document.createElement('h5')
  if (elem != 'accounts') head.classList.add('mt-5',)
  head.classList.add('mb-3')
  head.textContent = elem[0].toUpperCase() + elem.slice(1).replace(/_/g, ' ')
  clouddiv.append(head, div)
  return div
}
function mon() { return '/.netlify/functions/mongo?coll=' }
function grap() { return '/.netlify/functions/graph' }
