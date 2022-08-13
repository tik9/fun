
var container = document.getElementById('container')
var tiko = "Tiko's"

var dateformat = /^\d{4}-\d{2}-\d{2}/

var headers = { joke: 'Fetch Joke - enter keyword', stock: 'Fetch stock data - Result is probably in dollars', transcript: 'Fetch transcripts - tbd', nextexample: 'nextexample ..' }

var bottomnav = document.getElementById('bottomnav')
var topnav = document.getElementById('topnav')

document.title += tiko;

function locale_date(date = '') {
    var today = new Date()
    var todayDate = today.toISOString().substring(0, 10);
    var dateformat = { day: '2-digit', month: '2-digit', year: 'numeric' }

    return date == todayDate ? 'today' : new Date(today.setDate(today.getDate() - 1)).toISOString().substring(0, 10) == date ? 'yesterday' : new Date(date).toLocaleDateString('de-de', dateformat)
}

function list(arr) {
    var ul = document.createElement('ul')
    for (var elem in arr) {
        var val = arr[elem]
        val = dateformat.test(val) ? locale_date(val) : val

        var li = document.createElement('li')
        li.appendChild(document.createTextNode(`${elem.replace('_', ' ')}: ${val}`))
        ul.appendChild(li)
    }
    return ul
}


function ghli(elem) {
    var elemjs = `${elem}.js`;
    var li = document.createElement("li");
    var aref = document.createElement("a");
    li.appendChild(aref);
    aref.href = ghBase + '/public/' + elemjs
    aref.textContent = elemjs;
    ghUlLinks.appendChild(li);
    return elemjs
}
var ghUlLinks = document.createElement('ul')

function git_code() {
    var ghDivLink = document.getElementById("git_code");
    ghDivLink.classList.add('mt-4', 'mb-5')
    ghDivLink.append(ghUlLinks);
}
git_code()

var gih = 'https://github.com'
var ghMe = gih + '/tik9/netlify'
var ghBase = ghMe + '/blob/master'


ghli('src')
ghli('api')

function create_icon() {
    var icon = document.createElement("link");
    icon.rel = "icon";
    icon.href = gih + "/github.png";
    document.head.appendChild(icon);
}
create_icon()


async function includes() {
    var cdn = 'https://cdnjs.cloudflare.com/ajax/libs/'
    var boots = 'twitter-bootstrap/5.0.0/'

    var css_arr = [cdn + boots + 'css/bootstrap',];
    // css_arr = await css_js(css_arr, 'css')

    var js_arr = [
        cdn + 'jquery/3.6.0/jquery',
        cdn + boots + 'js/bootstrap']

    for (var elem of js_arr) { var script = document.createElement("script"); script.src = elem + '.min.js'; document.head.prepend(script) }

    for (var elem of css_arr) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = elem + ".min.css";
        document.head.appendChild(link);
    }
}
includes()
async function css_js(arr, type) {
    // console.log(arr, type)
    var res = await (await fetch('/dir/' + type)).json()
    var cut = res.map(str => ('/assets/' + type + '/' + str).replace(/\.min.*/, ''))
    arr = arr.concat(cut)
    return arr
}


function navbottom() {
    var aref = document.createElement("a");
    bottomnav.classList.add('fixed-bottom', 'bg-dark')
    aref.textContent = tiko;
    aref.classList.add('active', 'nav')
    bottomnav.append(aref)
    for (var elem of ["contact", 'imprint']) {
        var aref = document.createElement("a");
        aref.href = `${elem}.html`;
        aref.textContent = elem[0].toUpperCase() + elem.slice(1)
        aref.classList.add('nav')

        bottomnav.append(aref)
    }
}
navbottom()

function navtop() {
    topnav.id = 'topnav'
    topnav.classList.add('fixed-top', 'bg-dark')
    var aref = document.createElement("a");
    aref.classList.add('nav', 'active')
    aref.href = '#container';
    aref.textContent = 'Index'
    topnav.append(aref)
}
navtop()

function navtoparef() {


    var i = 1
    for (var elem in headers) {
        var aref = document.createElement('a')
        aref.textContent = '' + i + '. ' + elem
        aref.href = '#example' + i
        aref.classList.add('nav')
        i++
        topnav.append(aref)
    }

    container.prepend(topnav)
}
if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) != 'contact.html') navtoparef()