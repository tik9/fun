
'use strict'

// var cdn = 'https://cdnjs.cloudflare.com/ajax/libs/'
var github = 'https://github.com/'
var net_fun = '/.netlify/functions/'
var tiko = "Tiko's"

document.title += tiko;
document.body.style.paddingTop = '90px'

container.style.paddingBottom = '80px'

create_icon()
includes()
nav()

function create_icon() {
    var icon = document.createElement("link");
    icon.rel = 'icon'
    icon.href = github + "github.png";
    document.head.appendChild(icon);
}

async function css_js(type) {
    var res = await (await fetch(net_fun + 'files?dir=' + type)).json()
    res = res.object.entries.map(str => type + '/' + str.name)
    console.log(res)
    return res
}

async function includes() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.1/css/bootstrap.min.css'
    document.body.appendChild(link);
}

function nav() {
    topnav.classList.add('fixed-top', 'bg-dark')
    var aref = document.createElement("a");
    bottomnav.classList.add('fixed-bottom', 'bg-dark')
    aref.textContent = tiko;
    aref.href = '/'
    aref.classList.add('active', 'nav')
    bottomnav.append(aref)
    for (var elem of ["contact", 'imprint']) {
        var aref = document.createElement("a");
        aref.href = `${elem}.html`;
        aref.textContent = elem[0].toUpperCase() + elem.slice(1)
        aref.classList.add('nav')
        bottomnav.append(aref)
    }
    var aref = document.createElement("a");
    aref.href = github + 'tik9/fun'
    aref.textContent = 'github'
    aref.classList.add('nav')
    bottomnav.append(aref)
}