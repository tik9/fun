
'use strict'

var asset_dir = ''
var dateformat = /^\d{4}-\d{2}-\d{2}/
var github = 'https://github.com/'
var git = github + 'tik9/'
var git2 = git + 'fun'
var gitBase = git2 + '/blob/main/'
var netfun = '/.netlify/functions/'
var tiko = "Tiko's"

document.title += tiko;
document.body.style.paddingTop = '90px'

container.style.paddingBottom = '80px'

create_icon()
includes()
navbottom()

function create_icon() {
    var icon = document.createElement("link");
    icon.rel = "icon";
    icon.href = github + "github.png";
    document.head.appendChild(icon);
}

async function css_js(type) {
    var res = await (await fetch(netfun + 'files?dir=' + type)).json()
    res = res.object.entries.map(str => type + '/' + str.name)
    return res
}

async function includes() {
    var cdn = 'https://cdnjs.cloudflare.com/ajax/libs/'
    var boots = 'twitter-bootstrap/5.2.1/'

    includes_script([cdn + boots + 'js/bootstrap.min.js'])

    var css_arr = await css_js('css')
    css_arr.push(cdn + boots + 'css/bootstrap.min.css')
    for (var elem of css_arr) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = elem;
        document.body.appendChild(link);
    }
}

function includes_script(arr) {
    for (var elem of arr) {
        var script = document.createElement("script")
        script.src = elem
        if (elem == 'js/client.js') continue
        document.body.append(script)
    }
}

async function indexfun(head = 'intro') {
    var hIntro = document.createElement("h4");

    hIntro.innerHTML = (head[0].toUpperCase() + head.slice(1)).replace(/_/g, ' ')
    hIntro.classList.add('mt-5', 'mb-3');

    var elem = document.createElement('div')
    container.append(elem)
    elem.id = head
    elem.prepend(hIntro)
    var aHref = document.createElement("a");
    aHref.textContent = (head[0].toUpperCase() + head.slice(1)).replace(/_/g, ' ')
    aHref.classList.add('nav')
    aHref.href = '#' + head
    topnav.append(aHref)
    if (head == 'index') {
        aHref.classList.add('active', 'nav')
        aHref.href = '#container'
    } else if (head == 'tests') {
        aHref.setAttribute('data-test', 'tests_href')
        elem.setAttribute('data-test', 'tests_div')
    }
    return elem
}

function navbottom() {
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