
accounts()
// commits_repos()
// posts()


async function accounts() {
  // for (var elem of ['gitaccount', 'stackaccount', 'heroaccount', 'netaccount']) {
  try {
    // var newdiv = document.createElement('div')
    var clouddiv = document.getElementById('cloud')
    // clouddiv.append(newdiv)
    var res = await (await fetch('/.netlify/functions/file')).json()
    // console.log(res)
    for (var elem of res) {
      for (var elem2 in elem) {
        var val = elem[elem2]
        var sub = document.createElement('h6')
        sub.textContent = elem2
        // console.log(elem2)
        var ul = {}
        for (var elem3 in val) {
          // console.log(elem3, val[elem3])
          ul[elem3] = val[elem3]
        }
        clouddiv.append(sub, list(ul))

      }
    }
    // newdiv.append(list(res))
  } catch (error) { console.log(error) }
}

async function commits_repos() {
  for (var elem of ['commits', 'repos']) {
    try {
      var newdiv = document.createElement('div')
      var clouddiv = document.getElementById('cloud')
      clouddiv.append(newdiv)
      newdiv.id = elem
      indexfun(elem)
      newdiv.append(table((await getjson(elem)).slice(0, 5), elem))
    } catch (error) { console.log(error) }
  }
}


async function posts() {
  try {
    var res = await (await fetch('/filejs/posts')).json()
    // console.log(res)

    var posts = document.createElement('div')
    posts.id = 'posts'
    var clouddiv = document.getElementById('cloud')
    clouddiv.append(posts)
    for (var elem of [0, 1]) {
      var h5 = document.createElement('h5')
      h5.classList.add('mt-5', 'mb-3')
      h5.appendChild(document.createTextNode(toUpper(res[elem][0].cat)))
      posts.append(h5, table(res[elem], 'posts',))
    }
  } catch (error) { console.log(error) }
}