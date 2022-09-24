
var apiheaders = {
    joke: 'Fetch Joke - enter keyword', stock: 'Fetch stock data - Result is probably in dollars', clock: 'Get UTC Time',
    //  transcript: 'Fetch transcripts - tbd' 
}

var symbols = { abc: 'amerisourcebergen', aapl: 'apple', amzn: 'amazon' }

apis()
async function apis() {
    await sleep(100)
    var apis = arguments.callee.name
    await indexfun(apis)
    var count = 1
    for (var elem in apiheaders) {
        var div = document.createElement('div')
        div.classList.add('mt-4')
        div.id = elem
        document.getElementById(apis).append(div)
        var head = document.createElement('h5')
        head.classList.add('mb-2')
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
        btn.classList.add('ms-2', 'mt-2', 'btn', 'btn-primary')
        var btnElem = 'btn' + elem
        btn.id = btnElem
        btn.textContent = 'Fetch'
        btn.setAttribute('data-test', btnElem)
        if (!['clock'].includes(elem)) {
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

    document.getElementById('btnjoke').addEventListener('click', () => rapid('joke', document.getElementById('inputjoke')))
    document.getElementById('btnstock').addEventListener('click', () => rapid('stock', document.getElementById('inputstock')))

    document.getElementById('btnclock').addEventListener('click', async () => {
        var res = await (await fetch('http://worldtimeapi.org/api/timezone/Europe/london')).json()
        document.getElementById('resclock').innerHTML = res.utc_datetime.split('T')[1].slice(0, 5) + ' hours'
    })
}


async function rapid(type, input) {
    var resdiv = document.getElementById('res' + type)
    resdiv.innerHTML = ''
    var inputval = typeof (input) == 'undefined' ? '' : '&input=' + input.value
    var res = await (await fetch(netfun + 'rapid?type=' + type + inputval)).json()
    if (type == 'joke') {
        res = res.result.map(({ categories, created_at, icon_url, id, updated_at, ...keepAttrs }) => keepAttrs)
        resdiv.append(table(res, 'joke'))
    }
    else {
        res = res["Monthly Time Series"]
        res = res[Object.keys(res)[0]]['1. open']
        resdiv.innerText = Number(res.split('.')[0])
    }
}