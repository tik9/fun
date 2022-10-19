

function ani() {
    var div = document.createElement('div')
    div.classList.add('button')
    container.append(div)
    var h2 = document.createElement('h2')
    h2.classList.add('tab')
    div.append(h2)
    h2.textContent = 'Rollender Ball'
    var ptag = document.createElement('p')
    div.append(ptag)
    var itag = document.createElement('i')
    itag.classList.add('fas', 'fa-volleyball-ball', 'rollIn', 'animated')
    ptag.append(itag)
    // console.log(arguments.callee.name, 1)
}
