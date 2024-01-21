
var net_fun = '/.netlify/functions/'
var github = 'github.com'
var tiko = "Tiko's"

let topnav = document.createElement('div')

create_icon()
includes()
bottom_nav()
head()

var alias_cloud = 'social_cloud'
var dateformat = /^\d{4}-\d{2}-\d{2}/


function head() {
    document.title += tiko;

    let container = document.getElementById('container')
    container.style.paddingBottom = '80px'

    topnav.id = 'topnav'
    topnav.classList.add('fixed-top', 'bg-dark')

    let head = document.createElement('h4')
    topnav.append(head)
    head.textContent = 'Tiko'
    head.classList.add('mt-2', 'mb-2')
    head.style.color = 'white'
    document.body.prepend(topnav, container)
}

function list(arr, name) {
    var ul = document.createElement('ul')
    for (var elem in arr) {
        var val = arr[elem]
        elem = elem[0].toUpperCase() + elem.slice(1)
        val = dateformat.test(val) ? locale_date(val) : val

        var li = document.createElement('li')

        if (elem === 'Location') li = li_aref(elem, val)
        else if (name === 'accounts') li = li_aref(elem, val)
        else
            li.append(document.createTextNode(`${elem}: ${val}`))
        ul.appendChild(li)
    }
    return ul
}

function locale_date(date) {
    var today = new Date()
    var dateformat = { day: '2-digit', month: '2-digit', year: 'numeric' }

    return date == today.toISOString().substring(0, 10) ? 'today' : new Date(today.setDate(today.getDate() - 1)).toISOString().substring(0, 10) == date ? 'yesterday' : new Date(date).toLocaleDateString('de-de', dateformat)
}

function create_icon() {
    var icon = document.createElement("link");
    icon.rel = 'icon'
    icon.href = 'https://' + github + "/github.png";
    document.head.appendChild(icon);
}


async function includes() {
    var links = ['https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.0/css/bootstrap.min.css', "https://fonts.googleapis.com/css?family=Roboto", "https://fonts.googleapis.com/css?family=Yellowtail"]

    for (let elem of links) {

        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = elem
        document.head.appendChild(link);
    }
}

function bottom_nav() {
    bottomnav.classList.add('fixed-bottom', 'bg-dark')
    for (var elem of ['index', "contact", 'imprint']) {
        var aref = document.createElement("a");
        aref.href = `${elem}.html`;
        aref.textContent = elem[0].toUpperCase() + elem.slice(1)
        bottomnav.append(aref)
        aref.id = elem
    }
    const element = document.getElementById(window.location.pathname.split('/').pop().replace('.html', ''));
    if (element) element.classList.add('active');
}