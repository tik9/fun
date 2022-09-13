
var asset_dir = ''
var container = document.getElementById('container')
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
navbottom_top()

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

async function git_code(arr) {
    var ghUlLinks = document.createElement('ul')
    ghUlLinks.style.marginBottom = '70px'
    for (var elem of arr) {
        var li = document.createElement("li");
        var aref = document.createElement("a");
        li.appendChild(aref);
        aref.href = gitBase + 'public/' + elem
        aref.textContent = elem.slice(elem.lastIndexOf('/') + 1, elem.length)
        ghUlLinks.append(li);
    }
    var ghDivLink = document.createElement('div')
    var head = document.createElement('h5')
    head.textContent = 'Links'
    container.append(ghDivLink)
    ghDivLink.id = "git_code"
    ghDivLink.classList.add('mt-5', 'mb-5')
    ghDivLink.append(head, ghUlLinks);
}

async function includes() {
    var cdn = 'https://cdnjs.cloudflare.com/ajax/libs/'
    var boots = 'twitter-bootstrap/5.2.1/'
    // var boots = 'twitter-bootstrap/4.6.0/'
    var boots_sel = 'bootstrap-select/1.13.18/'

    includes_script([
        // cdn + 'popper.js/1.12.9/umd/popper.min.js',
        // cdn + 'jquery/3.6.0/jquery.min.js',
        // 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js',
        // 'https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/js/bootstrap-select.min.js'
        cdn + boots + 'js/bootstrap.min.js',
        // cdn + boots_sel + 'js/bootstrap-select.min.js'
    ])

    css_arr = await css_js('css')
    css_arr.push(
        cdn + boots + 'css/bootstrap.min.css',
        // 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css',
        // 'https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/css/bootstrap-select.min.css'
        // cdn + boots_sel + 'css/bootstrap-select.min.css'
    )
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
        document.body.append(script)
    }
}

// var respage
async function indexfun(head = 'intro') {
    var hIntro = document.createElement("h4");
    // var intro = document.createElement('div')
    // if (head == 'index') {
    // respage = await (await fetch(netfun + 'mongo?para1=index')).json()
    // var res = respage.filter(val => val.name == head)
    // res = res.reduce((a, b) => Object.assign(a, b), {})
    hIntro.innerHTML = (head[0].toUpperCase() + head.slice(1)).replace(/_/g, ' ')
    // intro.textContent = res.text
    // }
    hIntro.classList.add('mt-5');
    // intro.classList.add('mt-3', 'mb-3')

    var elem = document.createElement('div')
    container.append(elem)
    elem.id = head
    elem.prepend(hIntro)
    var aHref = document.createElement("a");
    aHref.textContent = (head[0].toUpperCase() + head.slice(1)).replace(/_/g, ' ')
    aHref.classList.add('nav')
    aHref.href = '#' + head
    topnav.append(aHref)
    if (head == 'intro') {
        hIntro.style.fontSize = 'xx-large'
        hIntro.classList.remove('mt-5')
        aHref.classList.add('active', 'nav')
        aHref.href = '#container'
    }
    if (head == 'tests') {
        aHref.setAttribute('data-test', 'tests-href')
        elem.setAttribute('data-test', 'tests-div')
    }
    return elem
}

function li_aref(text, href) {
    console.log()
    var aref = document.createElement('a')
    aref.textContent = text
    aref.href = href
    var li = document.createElement('li')
    li.append(aref)
    return li
}

function list(arr, name) {
    var ul = document.createElement('ul')
    for (var elem in arr) {
        var val = arr[elem]
        val = dateformat.test(val) ? locale_date(val) : val

        var li = document.createElement('li')
        if (name == 'symbols') {
            li.style.display = 'inline-block'
            li.classList.add('me-3')
            li.append(document.createTextNode(`${elem.replace('_', ' ')}: ${val}`))
        }
        else if (name == 'client' && elem == 'map') li = li_aref('Map', val)
        else if (name == 'accounts') li = li_aref(elem, val)
        else
            li.append(document.createTextNode(`${elem.replace('_', ' ')}: ${val}`))
        ul.appendChild(li)
    }
    return ul
}

function navbottom_top() {
    var topnav = document.getElementById('topnav')
    topnav.id = 'topnav'
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