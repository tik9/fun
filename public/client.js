
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

add_css()
create_icon()
git_code()
// includes()
navbottom()


async function add_css() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = bootstrap_root_cdn.cdn + bootstrap_root_cdn.boots + 'css/bootstrap.min.css'
    document.head.appendChild(link);
}

function create_icon() {
    var icon = document.createElement("link");
    icon.rel = "icon";
    icon.href = github + "github.png";
    document.head.appendChild(icon);
}

async function css_js(cdn, type) {
    var res = await (await fetch('/.netlify/functions/graph?para1=files')).json()
    // console.log(1, asset_dir)
    cdn.push(...res.map(str => (asset_dir + type + '/' + str)))
    return cdn
}

async function git_code() {
    var res = await (await fetch('/.netlify/functions/graph?para1=files')).json()
    res = res.object.entries
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

function includes() {
    var minjs = '.min.js'
    var arr = [
        bootstrap_root_cdn.cdn + bootstrap_root_cdn.boots + 'js/bootstrap' + minjs,
        bootstrap_root_cdn.cdn + 'jquery/3.6.0/jquery' + minjs,
    ]
    script_(arr)
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
        else if (name == 'geo' && elem == 'map') {
            var aref = document.createElement('a')
            aref.textContent = 'Map'
            aref.href = val
            li.append(aref)

        }
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

function script_(arr) {
    for (var elem of arr) {
        var script = document.createElement("script")
        script.src = elem
        document.head.prepend(script)
    }
}
