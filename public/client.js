
var net_fun = '/.netlify/functions/'
var github = 'github.com'
var tiko = "Tiko's"

let topnav = document.createElement('div')

create_icon()
includes()
bottom_nav()
head()

async function resMap(section) {
    let res = await Promise.all((await (await fetch(net_fun + section)).json()).map(async item => {
        return {
            ...item, date: await (await fetch(net_fun + 'utils?date=' + item.date)).json()
        }
    }))
    return res
}

async function commits() {
    let commits = arguments.callee.name
    let res = await resMap(commits)
    let div = document.createElement('div')

    div.id = commits
    let head = document.createElement('h4')
    head.classList.add('mt-4', 'mb-3')
    head.textContent = `My ${commits}`
    div.append(head, table(res, commits))
    document.getElementById('cloud').append(div)
}

async function issues() {
    let issues = arguments.callee.name

    let res = await resMap(issues)
    let div = document.createElement('div')

    div.id = issues
    let head = document.createElement('h4')
    head.classList.add('mt-4', 'mb-3')
    head.textContent = `My ${issues}`

    document.getElementById('cloud').append(div)

    div.append(head, table(res, issues))
}

async function lyrics() {
    let lyrics = arguments.callee.name
    let res = JSON.parse(await (await fetch(net_fun + lyrics)).json())
    let div = document.createElement('div')

    div.id = lyrics
    let head = document.createElement('h4')
    head.textContent = 'My favourite lyrics'
    head.classList.add('mt-4', 'mb-3')
    let ol = document.createElement('ol')
    div.append(head, ol)
    for (let elem of res) {
        let li = document.createElement('li')
        ol.append(li)
        li.style.marginBottom = '25px'
        li.id = elem.song
        ol.append(li)

        let lyrics = elem.lyrics
        let lyrics_short = lyrics.slice(0, 70)
        lyrics_short = lyrics_short.slice(0, lyrics_short.lastIndexOf(' '))

        let writer = elem.writer[0].toUpperCase() + elem.writer.slice(1)
        let song = elem.song[0].toUpperCase() + elem.song.slice(1)
        let writer_song = `${writer}: ${song}`
        let writer_song_head = document.createElement('h6')
        writer_song_head.textContent = writer_song
        let content_short = lyrics_short
        let lyrics_span = document.createElement('span')
        lyrics_span.innerText = content_short
        lyrics_span.id = song + '_content'
        let btn = document.createElement('button')
        btn.id = 'btn_' + song
        btn.textContent = 'Read more'
        btn.classList.add('btn', 'btn-info')

        btn.addEventListener('click', () => {
            if (dots.style.display === 'none') {
                dots.style.display = 'inline'
                btn.textContent = 'Read more'
                lyrics_span.innerText = content_short
            }
            else {
                dots.style.display = 'none'
                btn.textContent = 'Read less'
                lyrics_span.innerText = lyrics + '\n'
            }
        })
        let dots = document.createElement('span')
        dots.textContent = '...'
        dots.id = 'dots_' + song
        li.append(writer_song_head, lyrics_span, dots, btn)
    }
    document.getElementById('container').append(div)
}

async function posts() {
    let posts = arguments.callee.name
    let res = await resMap(posts)

    let div = document.createElement('div')

    div.id = posts
    let head = document.createElement('h4')
    div.append(head, table(res, posts))
    head.classList.add('mt-4', 'mb-3')
    head.textContent = `My ${posts}`
    document.getElementById('cloud').append(div)
}

async function repos() {
    let repos = arguments.callee.name
    let res = await (await fetch(net_fun + repos)).json()
    let div = document.createElement('div')
    div.id = repos
    let head = document.createElement('h4')
    head.classList.add('mt-4', 'mb-3')
    head.textContent = `Github ${repos} I watch`

    let ol = document.createElement('ol')
    div.append(head, ol)
    for (let i = 0; i < res.length; i++) {
        let elem = res[i]
        let li = document.createElement('li')
        li.id = elem.name
        li.style.marginBottom = '25px'
        ol.append(li)
        li.innerHTML = `<h5>${elem.name[0].toUpperCase() + elem.name.slice(1)}</h5>${elem.description}<br><br><b>Commits</b>`
        for (let j = 0; j < elem.commits.length; j++) {
            let elem2 = elem.commits[j]
            let comm_msg = elem2.message
            let elem_name = elem.name.toLowerCase()
            let btn = ''
            let str_size = 70
            let dots = ''
            let new_date = await (await fetch(net_fun + 'utils?date=' + elem2.date)).json()

            let date_ = `<br><br>${new_date}:<br>`
            let content_short = `${date_}${comm_msg}`

            if (comm_msg.length > str_size) {
                comm_msg = comm_msg.slice(0, str_size)
                comm_msg = comm_msg.slice(0, comm_msg.lastIndexOf(" "))
                content_short = `${date_}${comm_msg}`

                btn = document.createElement('button')
                btn.id = `${elem_name}${j}`
                btn.textContent = 'Read more'
                btn.classList.add('btn', 'btn-info')

                dots = document.createElement('span')
                dots.textContent = '...'
                dots.id = 'dots'
                btn.addEventListener('click', () => {
                    if (dots.style.display === "none") {
                        dots.style.display = "inline";
                        btn.textContent = "Read more";
                        comm.innerHTML = content_short

                    } else {
                        dots.style.display = "none";
                        btn.textContent = "Read less";
                        comm.innerHTML = `${date_}${elem2.message}`
                    }
                })

            }
            let comm = document.createElement('span')
            comm.innerHTML = content_short
            comm.id = `${elem_name}${j}`

            li.append(comm, dots, btn)
        }
        document.getElementById('cloud').append(div)

    }
}

async function trepos() {
    let repos = arguments.callee.name
    let res = await resMap(repos)
    let div = document.createElement('div')

    div.id = repos
    let head = document.createElement('h4')
    head.classList.add('mt-4', 'mb-3')
    head.textContent = 'Github repos I own'
    div.append(head, table(res, repos))
    document.getElementById('cloud').append(div)
}


async function accounts() {
    let accounts = arguments.callee.name
    let cloud_arr = [
        {
            name: "stack", url:
                'https://api.stackexchange.com/2.2/users/1705829?site=stackoverflow',
            link: 'link'
        },
        { name: "git", url: 'https://api.github.com/users/tik9', link: 'html_url' }
    ]
    let obj = {}
    for (let elem of cloud_arr) {
        let res = await (await fetch(elem.url)).json()
        let name = elem.name
        if (name == 'stack')
            res = Object.values(res.items)[0]

        obj[name] = res[elem.link]
    }

    let div = document.createElement('div')

    div.id = accounts
    let head = document.createElement('h4')
    head.classList.add('mt-4', 'mb-3')
    head.textContent = accounts[0].toUpperCase() + accounts.slice(1)
    document.getElementById('cloud').append(head, div)

    div.append(list(obj, accounts))
}

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
    head.style.display = 'inline-block'
    head.style.color = 'white'
    head.style.marginRight = '30px'

    document.body.prepend(topnav, container)
}

function list(arr, name) {
    var ul = document.createElement('ul')
    for (var elem in arr) {
        var val = arr[elem]
        elem = elem[0].toUpperCase() + elem.slice(1)

        var li = document.createElement('li')
        ul.appendChild(li)

        li.append(document.createTextNode(`${elem}: ${val}`))
    }
    return ul
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
    let livejs = document.createElement('script')
    livejs.src = 'js/live.js'
    document.head.append(livejs)
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