
var net_fun = '/.netlify/functions/'

let livejs = document.createElement('script')
livejs.src = 'js/live.js'
document.head.append(livejs)

index()
// lyrics()
repos()

async function index() {
    let arr = [
        'commits',
        'issues',
        lyrics,
        'posts',
        repos,
        'tk_repos'
    ]

    for (let elem of arr) {
        if (typeof (elem) === 'function')
            elem()
        else {
            let res = await (await fetch(net_fun + elem)).json()

            res = await Promise.all(res.map(async elem => { return { ...elem, date: await (await fetch(net_fun + 'utils?date=' + elem.date)).json() } }))

            let head = document.createElement('h4')
            head.classList.add('mt-4', 'mb-3')
            head.textContent = `My ${elem}`
            let div = document.createElement('div')
            div.id = elem
            div.append(head, table(res, elem))
            document.getElementById('content').append(div)

            let btn = document.createElement('button')
            btn.classList.add('btn', 'btn-link')
            btn.textContent = elem[0].toUpperCase() + elem.slice(1)
            btn.style.color = 'white'
            btn.style.marginRight = '20px'
            btn.addEventListener('click', (e) => {
                document.getElementById(elem).scrollIntoView({
                    behavior: 'smooth'
                });
                e.preventDefault()
            })
            topnav.append(btn)
        }
    }
}

async function lyrics() {
    let lyrics = arguments.callee.name
    let res = JSON.parse(await (await fetch(net_fun + lyrics)).json())
    let div = document.createElement('div')

    div.id = lyrics
    let head = document.createElement('h4')
    head.textContent = 'My favourite songs'
    head.classList.add('mt-4', 'mb-3')
    let ol = document.createElement('ol')
    div.append(head, ol)
    for (let elem of res) {

        let writer = elem.writer[0].toUpperCase() + elem.writer.slice(1)
        let song = elem.song[0].toUpperCase() + elem.song.slice(1)
        let writer_song = `${writer}: ${song}`
        let ws_head = document.createElement('h6')
        ws_head.style.display = 'inline'

        ws_head.textContent = writer_song
        ws_head.style.marginRight = '10px'
        let li = document.createElement('li')
        ol.append(li)
        li.style.marginBottom = '25px'
        li.id = elem.song
        ol.append(li)
        let ifrm = document.createElement("iframe");
        let lyrics = document.createElement('span')
        let dots2 = document.createElement('span')
        let btn2 = document.createElement('button')

        let btn1 = document.createElement('button')

        btn1.id = 'btn1_' + song
        btn1.textContent = 'Open song'
        btn1.classList.add('btn', 'btn-info')
        document.addEventListener('keyup', (e) => { if (e.code === 'Enter') callb() })
        btn1.addEventListener('click', () => callb())

        function callb() {
            if (btn1.textContent === 'Close song') {
                btn1.textContent = 'Open song'

                ifrm.style.display = 'none'
                lyrics.style.display = 'none'
                dots2.style.display = 'none'
                btn2.style.display = 'none'
            }
            else {
                btn1.textContent = 'Close song'

                ifrm.style.display = 'block'
                ifrm.setAttribute("src", 'https://www.youtube.com/embed/' + elem.link.split('v=').pop());
                ifrm.style.width = "300px";
                ifrm.style.height = "300px";

                lyrics.style.display = 'inline'
                let lyrics_long = elem.lyrics.slice(0, 1000)
                let lyrics_short = lyrics_long.slice(0, 70)
                lyrics_short = lyrics_short.slice(0, lyrics_short.lastIndexOf(' '))
                lyrics.innerText = '\n\n' + lyrics_short
                lyrics.id = song + '_content'

                dots2.textContent = '...'
                dots2.id = 'dots2_' + song

                btn2.style.display = 'inline'
                btn2.id = 'btn2_' + song
                btn2.textContent = 'Read more'
                btn2.classList.add('btn', 'btn-info')

                btn2.addEventListener('click', () => {

                    lyrics.innerText = '\n\n'
                    if (dots2.style.display === 'none') {
                        lyrics.innerText += lyrics_short
                        dots2.style.display = 'inline'
                        dots2.textContent = '...'
                        btn2.textContent = 'Read more'
                    }
                    else {
                        lyrics.innerText += lyrics_long + '\n'
                        dots2.style.display = 'none'
                        btn2.textContent = 'Read less'
                    }
                })

                li.append(ifrm, lyrics, dots2, btn2)
            }
        }
        li.append(ws_head, btn1)
    }
    document.getElementById('content').append(div)
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
        document.getElementById('content').append(div)

    }
}

