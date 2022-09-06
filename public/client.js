
var modal = `<div id="mymodal" style="display:none;" class="modal fade" role="dialog">
<div class="modal-dialog">  
  <div class="modal-content">
    <div class="modal-header">
    <h5 id=modal-title class="modal-title" data-test="success_msg"></h5>
    <button class="close" data-bs-dismiss="modal">&times;</button>
    </div>
    <div id="modal-content" class="modal-body"></div>
    <div class="modal-footer">
      <button id=mail_btn class="btn btn-primary send_btn">Send</button>
      <button id=final_close data-bs-dismiss=modal class="btn btn-primary">Close</button>
    </div>
  </div>
</div>
</div>`

document.body.insertAdjacentHTML("afterbegin", modal);

var modalTitle = document.getElementById('modal-title')

var asset_dir = ''
var container = document.getElementById('container')
var dateformat = /^\d{4}-\d{2}-\d{2}/
var github = 'https://github.com/'
var git = github + 'tik9/'
var git2 = git + 'fun'
var gitBase = git2 + '/blob/main/'
var tiko = "Tiko's"

document.title += tiko;

var ghUlLinks = document.createElement('ul')
ghUlLinks.style.marginBottom = '70px'
var topnav = document.getElementById('topnav')
topnav.id = 'topnav'
topnav.classList.add('fixed-top', 'bg-dark')

var bootstrap_root_cdn = { cdn: 'https://cdnjs.cloudflare.com/ajax/libs/', boots: 'twitter-bootstrap/5.0.0/' }

create_icon()
// git_code()
includes()
navbottom()

function create_icon() {
    var icon = document.createElement("link");
    icon.rel = "icon";
    icon.href = github + "github.png";
    document.head.appendChild(icon);
}

async function css_js(type) {
    var res = await (await fetch('/.netlify/functions/files?dir=' + type)).json()
    res = res.object.entries.map(str => type + '/' + str.name)
    // console.log(1, res)
    return res
}

async function git_code() {
    var res = (await (await fetch('/.netlify/functions/files?dir=js')).json()).object.entries
    // res = res.object.entries
    for (var elem of res) {
        var li = document.createElement("li");
        var aref = document.createElement("a");
        li.appendChild(aref);
        aref.href = gitBase + 'public/js/' + elem.name
        aref.textContent = elem.name
        ghUlLinks.append(li);
    }
    var ghDivLink = document.getElementById("git_code");
    ghDivLink.classList.add('mt-5', 'mb-5')
    ghDivLink.append(ghUlLinks);
}

async function includes() {
    var cdn = 'https://cdnjs.cloudflare.com/ajax/libs/'
    var boots = 'twitter-bootstrap/5.0.0/'

    css_arr = await css_js('css')
    css_arr.push(cdn + boots + 'css/bootstrap.min.css')

    includes_load([cdn + boots + 'js/bootstrap.min.js'])

    for (var elem of css_arr) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = elem;
        document.head.appendChild(link);
    }
}
function includes_load(arr) {
    for (var elem of arr) {
        console.log(elem)
        if (elem == 'js/api.js') continue
        var script = document.createElement("script")
        script.src = elem
        document.head.append(script)
    }
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
        }
        else if (name == 'client' && elem == 'map') li = li_aref('Map', val)
        else if (name == 'cloud_accounts')
            li = li_aref(elem, val)
        else
            li.append(document.createTextNode(`${elem.replace('_', ' ')}: ${val}`))
        ul.appendChild(li)
    }
    return ul
}

function navbottom() {
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
}