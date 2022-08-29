
accounts()
comm_posts_repo()

async function accounts() {
  try {
    var res = await (await fetch(netur() + arguments.callee.name)).json()
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

function netur() { return '/.netlify/functions/mongo?coll=' }

async function comm_posts_repo() {
  try {
    for (var elem of ['commits', 'posts', 'repos']) {
      var res = await (await fetch(netur() + elem)).json()
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
  head.textContent = elem[0].toUpperCase() + elem.slice(1)
  clouddiv.append(head, div)
  return div
}
