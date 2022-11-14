
'use strict'

var cdn = 'https://cdnjs.cloudflare.com/ajax/libs/'
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
    return res
}

async function includes() {
    var boots = 'twitter-bootstrap/5.2.1/'

    for (var elem of [cdn + boots + 'css/bootstrap.min.css']
    ) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = elem;
        document.body.appendChild(link);
    }
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
    var div = document.createElement('div')
    bottomnav.append(div)
    div.innerHTML = 'moving numbers + text for a living'
    div.classList.add('nav')
}