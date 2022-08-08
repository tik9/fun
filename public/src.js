
var container = document.getElementById('container')
var tiko = "Tiko's"

function ghli(elem) {
    var elemjs = `${elem}.js`;
    var li = document.createElement("li");
    var ahref = document.createElement("a");
    li.appendChild(ahref);
    ahref.href = ghBase + '/public/' + elemjs
    ahref.textContent = elemjs;
    ghUlLinks.appendChild(li);
    return elemjs
}
var ghUlLinks = document.createElement('ul')

function git_code() {
    var ghDivLink = document.getElementById("git_code");
    ghDivLink.classList.add('mt-4', 'mb-5')
    ghDivLink.style.display = 'inline-block'
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

function js_css() {
    var cdn = 'https://cdnjs.cloudflare.com/ajax/libs/'
    var boots = 'twitter-bootstrap/5.0.0/'

    var boot = cdn + boots + 'css/bootstrap'

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = boot + ".min.css";
    document.head.appendChild(link);
}
js_css()

function foot() {
    var arr = ["contact", 'imprint'];

    var footer = document.createElement('footer')
    var indexli = document.createElement('span')
    indexli.innerText = tiko
    indexli.style.backgroundColor = 'green'
    indexli.style.color = 'white'
    indexli.classList.add('me-2', 'ms-2')
    footer.append(indexli)
    footer.classList.add('pt-3', 'pb-2', 'bg-dark', 'fixed-bottom')
    for (var elem of arr) {
        var aref = document.createElement("a");
        aref.classList.add('ms-2')
        aref.href = `${elem}.html`;
        aref.textContent = elem[0].toUpperCase() + elem.slice(1)
        aref.style.color = 'white'
        footer.append(aref)
    }
    container.append(footer)
}
foot()

function head() {
    document.title += tiko;
    var h3 = document.createElement('h3')
    var nav = document.createElement('div')
    nav.append(h3)
    nav.id = 'nav'
    nav.classList.add('nav', 'pt-2', 'ps-3', 'fixed-top', 'bg-dark')
    var aref = document.createElement("a");
    aref.href = '/';
    aref.style.color = 'white'
    aref.style.backgroundColor = 'green'
    aref.textContent = 'Index'
    h3.append(aref)
    container.prepend(nav)
}
head()