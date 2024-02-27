

var array_of_functions = [
    commits,
    issues,
    posts,
    repos,
    trepos
]

for (i = 0; i < array_of_functions.length; i++) {
    array_of_functions[i]();
    let fname = array_of_functions[i].name
    let ahref = document.createElement('a')
    ahref.href = '#' + fname
    ahref.text = fname[0].toUpperCase() + fname.slice(1)
    ahref.style.color = 'white'
    ahref.style.marginRight = '20px'
    topnav.append(ahref)
}