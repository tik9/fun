
var symbols = { aapl: 'apple', amzn: 'amazon', googl: 'google', msft: 'microsoft' }

var headers = { joke: 'Fetch Joke - enter keyword', stock: 'Fetch stock data - Result is probably in dollars', transcript: 'Fetch transcripts - tbd', nextexample: 'nextexample ..' }

function creategui() {
    i = 1
    for (var elem in headers) {
        var apis = document.getElementById('apis')
        var div = document.createElement('div')
        div.classList.add('mt-5')
        div.id = 'example' + i
        apis.append(div)
        var h5 = document.createElement('h5')
        h5.innerText = headers[elem]
        div.append(h5)
        if (elem == 'stock') {
            var sym = document.createElement('div')
            var headsym = document.createElement('h6')
            sym.id = 'symbols'
            sym.classList.add('mt-2')
            headsym.classList.add('mt-2')
            headsym.textContent = 'Symbols - Companies:'
            var ul = document.createElement('ul')
            sym.append(ul)
            for (var symelem in symbols) {
                var li = document.createElement('li')
                ul.append(li)
                var stock = symelem + ': ' + symbols[symelem]
                li.innerText = stock
            }
            div.append(headsym, sym)
        }
        var btn = document.createElement('button')
        btn.classList.add('ms-2', 'btn', 'btn-primary')
        btn.id = elem
        btn.textContent = 'Fetch'
        btn.setAttribute('data-test','btn'+ elem)
        if (elem != 'transcript') {
            var input = document.createElement('input')
            input.id = 'query' + elem
            input.classList.add('mt-3')
            input.required = true
            input.setAttribute('data-test','input'+ elem)
            // input.value = 'msft'
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
        console.log(1, type, res)
        if (type == 'joke') res = res.result
        else {
            var resstock = document.getElementById('resstock')
            res = res["Monthly Time Series"]
            var lastkey = Object.keys(res)[0]
            res = res[lastkey]['1. open']
            resstock.innerText = res.split('.')[0]
            return
        }
        var ul = document.createElement('ul')
        for (var elem of res) {
            var li = document.createElement('li')
            var aref = document.createElement('a')
            aref.href = elem.url
            aref.textContent = elem.value
            li.append(aref)
            ul.append(li)
        }
        var resjoke = document.getElementById('resjoke')
        resjoke.append(ul)
    } catch (err) { console.log(err) }
}

var fetchjoke = document.getElementById('joke')
// fetchjoke.focus()
fetchjoke.addEventListener('click', async (event) => {
    resjoke.innerText = ''
    rapid(event.target.id, document.getElementById('queryjoke').value)
})

var fetchstock = document.getElementById('stock')
// fetchstock.focus()
fetchstock.addEventListener('click', async (event) => {
    resstock.innerText = ''
    rapid(event.target.id, document.getElementById('querystock').value)
})

var fetchtrans = document.getElementById('transcript')
fetchtrans.focus()
fetchtrans.addEventListener('click', async (event) => {
    // var res = await fetch('/.netlify/functions/as2')
    var res = await (await fetch('/.netlify/functions/as2')).json()
    console.log(1, res)
    // res = await res.json()
    // console.log(2, res)

    var restranscript = document.getElementById('restranscript')
    restranscript.innerText = 'Api result: ' + res
}
)
