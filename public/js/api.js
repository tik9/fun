
var apiheaders = { joke: 'Fetch Joke - enter keyword', stock: 'Fetch stock data - Result is probably in dollars', transcript: 'Fetch transcripts - tbd', clock: 'Get current UTC Time' }

var symbols = { abc: 'amerisourcebergen', aapl: 'apple', amzn: 'amazon' }
var api_div = document.getElementById('apis')
api_div.scrollIntoView()

// api()
creategui()

async function api() {
    var res = []
    // var res = await getjson('apis')
    api_div.append(table(res, 'apis'))
}


async function api_helper() {
    document.getElementById('restranscript').innerText = ''
    var modalDiv = document.getElementById('mymodal')
    var myModal = new bootstrap.Modal(modalDiv)
    myModal.show();
    mail_btn.style.display = 'none'
    modalTitle.textContent = 'The api is loading'
    try {
        var res = await (await fetch('/.netlify/functions/transcript')).json()
        var endres = res
    } catch (error) {
        console.log('err here', error)
        endres = 'No result'
    }
    // await sleep(4000)
    modalTitle.textContent = 'Loading finished, you can close the window'
    // var res = 'end'
    document.getElementById('restranscript').innerText = 'Result: ' + endres
    // myModal.hide()
}

async function creategui() {
    await sleep(100)
    i = 1
    for (var elem in apiheaders) {
        var div = document.createElement('div')
        div.classList.add('mt-5')
        div.id = elem
        api_div.append(div)
        var head = document.createElement('h5')
        head.innerText = i + '. ' + apiheaders[elem]
        div.append(head)
        if (elem == 'stock') {
            var symbol = 'symbols'
            var sym = document.createElement('div')
            var headsym = document.createElement('h6')
            sym.id = symbol
            sym.classList.add('mt-2')
            headsym.classList.add('mt-2')
            headsym.textContent = symbol + ' - Companies:'
            sym.append(list(symbols, symbol))
            div.append(headsym, sym)
        }
        var btn = document.createElement('button')
        btn.classList.add('ms-2', 'btn', 'btn-primary')
        btn.id = 'btn' + elem
        btn.textContent = 'Fetch'
        btn.setAttribute('data-test', 'btn' + elem)
        if (!['transcript', 'clock'].includes(elem)) {
            var input = document.createElement('input')
            btn.addEventListener('click', async (event) => { rapid(event.target.id.slice(3), input) })
            input.id = 'input' + elem
            input.classList.add('mt-3')
            input.required = true
            input.setAttribute('data-test', 'input' + elem)
            if (location.host.split(':')[0] == 'localhost') input.value = 'abc'
            div.append(input, btn)
        } else div.append(btn)

        var res = document.createElement('div')
        res.id = 'res' + elem
        res.classList.add('mt-3')
        res.textContent = '.. ' + elem + ' waits ..'
        div.append(res)
        i++
    }

    var btntrans = document.getElementById('btntranscript')
    btntrans.focus()
    btntrans.addEventListener('click', async (event) => { api_helper() })

    document.getElementById('btnclock').addEventListener('click', async (event) => {
        var res = await (await fetch('http://worldclockapi.com/api/json/utc/now')).json()
        res = res.currentDateTime.split('T')[1].slice(0, 5) + ' hours'
        document.getElementById('resclock').innerText = 'Result: ' + res
    })
}

async function rapid(type, input) {
    input.innerText = ''
    var resdiv = document.getElementById('res' + type)
    try {
        var res = await (await fetch('/.netlify/functions/rapid?type=' + type + '&input=' + input.value)).json()
        if (type == 'joke') {
            res = res.result.map(({ categories, created_at, icon_url, id, updated_at, ...keepAttrs }) => keepAttrs)
            resdiv.append(table(res, 'joke'))
        }
        else {
            res = res["Monthly Time Series"]
            // var lastkey = Object.keys(res)[0]
            res = res[Object.keys(res)[0]]['1. open']
            resdiv.innerText = res.split('.')[0]
        }
    } catch (err) { console.log(err) }
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }