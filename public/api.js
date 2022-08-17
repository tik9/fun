
var symbols = { abc: 'amerisourcebergen', aapl: 'apple', amzn: 'amazon', googl: 'google', msft: 'microsoft' }

function creategui() {
    i = 1
    for (var elem in headers) {
        var apis = document.getElementById('apis')
        var div = document.createElement('div')
        div.classList.add('mt-5')
        div.id = elem
        apis.append(div)
        var h5 = document.createElement('h5')
        h5.innerText = i + '. ' + headers[elem]
        div.append(h5)
        if (elem == 'stock') {
            var sym = document.createElement('div')
            var headsym = document.createElement('h6')
            sym.id = 'symbols'
            sym.classList.add('mt-2')
            headsym.classList.add('mt-2')
            headsym.textContent = 'Symbols - Companies:'
            sym.append(list(symbols))
            div.append(headsym, sym)
        }
        var btn = document.createElement('button')
        btn.classList.add('ms-2', 'btn', 'btn-primary')
        btn.id = 'btn' + elem
        btn.textContent = 'Fetch'
        btn.setAttribute('data-test', 'btn' + elem)
        if (elem != 'transcript') {
            var input = document.createElement('input')
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
}
creategui()

async function rapid(type, input = '') {
    try {
        var res = await (await fetch('/.netlify/functions/rapid', {
            method: 'post',
            body: JSON.stringify({ type: type, input: input })
        })).json()
        console.log(res.result)
        if (type == 'btnjoke') {
            res = res.result.map(({ categories, created_at, icon_url, id, updated_at, ...keepAttrs }) => keepAttrs)
            document.getElementById('resjoke').append(table(res, 'joke'))
        }
        else {
            res = res["Monthly Time Series"]
            var lastkey = Object.keys(res)[0]
            res = res[lastkey]['1. open']
            document.getElementById('resstock').innerText = res.split('.')[0]
        }

    } catch (err) { console.log(err) }
}

var btnjoke = document.getElementById('btnjoke')
btnjoke.focus()
btnjoke.addEventListener('click', async (event) => {
    resjoke.innerText = ''
    rapid(event.target.id, document.getElementById('inputjoke').value)
})

var btnstock = document.getElementById('btnstock')
// btnstock.focus()
btnstock.addEventListener('click', async (event) => {
    resstock.innerText = ''
    rapid(event.target.id, document.getElementById('inputstock').value)
})

var btntrans = document.getElementById('btntranscript')
btntrans.addEventListener('click', async (event) => {
    var res = await (await fetch('/.netlify/functions/as2')).json()

    document.getElementById('restranscript').innerText = 'Api result: ' + res
}
)
