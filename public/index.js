

var array_of_functions = [
    commits,
    issues,
    lyrics,
    posts,
    repos,
    trepos
]

for (i = 0; i < array_of_functions.length; i++) {
    array_of_functions[i]();
    let fname = array_of_functions[i].name
    let btn = document.createElement('button')
    btn.classList.add('btn', 'btn-link')
    // ahref.href = '#' + fname
    btn.textContent = fname[0].toUpperCase() + fname.slice(1)
    btn.style.color = 'white'
    btn.style.marginRight = '20px'
    btn.addEventListener('click', (e) => {
        document.getElementById(fname).scrollIntoView({
            behavior: 'smooth'
        });
        e.preventDefault()
        // return false
    })
    topnav.append(btn)
}