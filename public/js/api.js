
var apiheaders = {
    joke: 'Fetch Joke - enter keyword', stock: 'Fetch stock data - Result is probably in dollars', clock: 'Get UTC Time',
    //  transcript: 'Fetch transcripts - tbd' 
}

var symbols = { abc: 'amerisourcebergen', aapl: 'apple', amzn: 'amazon' }
var api_div = document.getElementById('apis')


async function creategui() {
    var count = 1
    for (var elem in apiheaders) {
        var div = document.createElement('div')
        div.classList.add('mt-4')
        div.id = elem
        api_div.append(div)
        var head = document.createElement('h5')
        head.innerText = count + '. ' + apiheaders[elem]
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
        var btnElem = 'btn' + elem
        btn.id = btnElem
        btn.textContent = 'Fetch'
        btn.setAttribute('data-test', btnElem)
        if (!['transcript', 'clock'].includes(elem)) {
            var input = document.createElement('input')
            var inputElem = 'input' + elem
            input.id = inputElem
            input.classList.add('mt-3')
            input.required = true
            if (location.host.split(':')[0] == 'localhost') input.value = 'abc'
            input.setAttribute('data-test', inputElem)
            div.append(input, btn)
        } else div.append(btn)

        var res = document.createElement('div')
        var resElem = 'res' + elem
        res.id = resElem
        res.classList.add('mt-3')
        res.textContent = '.. ' + elem + ' waits ..'
        res.setAttribute('data-test', resElem)
        div.append(res)
        count++
    }
}
creategui()

document.getElementById('btnjoke').addEventListener('click', event => rapid('joke', document.getElementById('inputjoke')))
document.getElementById('btnstock').addEventListener('click', event => rapid('stock', document.getElementById('inputstock')))
document.getElementById('btnclock').addEventListener('click', event => rapid('clock'))

function transcript_to_func() {
    var btntrans = document.getElementById('btntranscript')

    btntrans.addEventListener('click', async (event) => {
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
        modalTitle.textContent = 'Loading finished, you can close the window'
        document.getElementById('restranscript').innerText = 'Result: ' + endres
    })
}

async function rapid(type, input) {
    var resdiv = document.getElementById('res' + type)
    resdiv.innerHTML = ''
    var inputval = typeof (input) == 'undefined' ? '' : '&input=' + input.value
    try {
        var res = await (await fetch('/.netlify/functions/rapid?type=' + type + inputval)).json()
        if (type == 'joke') {
            res = res.result.map(({ categories, created_at, icon_url, id, updated_at, ...keepAttrs }) => keepAttrs)
            resdiv.append(table(res, 'joke'))
        }
        else if (type == 'clock') resdiv.innerHTML = res.utc_datetime.split('T')[1].slice(0, 5) + ' hours'
        else {
            res = res["Monthly Time Series"]
            res = res[Object.keys(res)[0]]['1. open']
            resdiv.innerText = Number(res.split('.')[0])
        }
    } catch (err) { console.log(err) }
}