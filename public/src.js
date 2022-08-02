
var container = document.getElementById('container')

var btnjoke = document.getElementById('fetch-joke')

if (btnjoke)
    btnjoke.addEventListener('click', async () => {
        var restext = document.getElementById('restext')
        restext.innerText = ''
        async function joke() {
            var res = await (await fetch('/.netlify/functions/rapid')).json()
            console.log(res)
            var ul = document.createElement('ul')
            for (var elem of res.result) {
                var li = document.createElement('li')
                var aref = document.createElement('a')
                aref.href = elem.url
                aref.textContent = elem.value
                li.append(aref)
                ul.append(li)
            }
            restext.append(ul)
        }
        joke()
    })

function ghli(elem) {
    var elemjs = `${elem}.js`;
    var li = document.createElement("li");
    var ahref = document.createElement("a");
    li.appendChild(ahref);
    ahref.href = ghBase + '/assets/' + elemjs
    ahref.textContent = elemjs;
    ghUlLinks.appendChild(li);
    return elemjs
}
var ghUlLinks = document.createElement('ul')

function git_code() {
    var ghDivLink = document.getElementById("git_code");
    ghDivLink.style.marginTop = '40px'
    ghDivLink.style.display = 'inline-block'
    ghDivLink.append(ghUlLinks);
}
git_code()

var gih = 'https://github.com'
var ghMe = gih + '/tik9/netlify'
var ghBase = ghMe + '/blob/master'


ghli('src')

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

function con_impr() {
    var arr = ["contact", 'imprint'];

    var ul = document.createElement('ul')
    ul.style.listStyleType = "none"
    ul.classList.add('list-inline', 'mt-4')
    for (var elem of arr) {
        var li = document.createElement('li')
        li.classList.add('list-inline-item')

        var aref = document.createElement("a");
        aref.href = `${elem}.html`;
        aref.textContent = elem[0].toUpperCase() + elem.slice(1)
        li.append(aref)
        ul.append(li)
    }
    container.append(ul)
}
con_impr()

function head() {
    var tiko = "Tiko's"
    document.title += tiko;
    var h3 = document.createElement('h3')
    h3.classList.add('mt-4')
    var aref = document.createElement("a");
    aref.href = '/';
    aref.textContent = tiko
    h3.append(aref)
    container.prepend(h3)
}
head()