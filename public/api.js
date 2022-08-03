
var symbols = { aapl: 'apple', amzn: 'amazon', msft: 'microsoft' }
var symboldiv = document.getElementById('symbols')
var ul = document.createElement('ul')
symboldiv.append(ul)
for (var elem in symbols) {
    var li = document.createElement('li')
    ul.append(li)
    var stock = elem + ': ' + symbols[elem]
    li.innerText = stock
    // console.log(stock)
}

async function rapid(type, input = '') {
    try {
        var resjoke = document.getElementById('resjoke')
        var resstock = document.getElementById('resstock')
        var res = await (await fetch('/.netlify/functions/rapid', {
            method: 'post',
            body: JSON.stringify({ type: type, input: input })
        })).json()
        if (type == 'joke') res = res.result
        else {
            res = res["Monthly Time Series"]
            var lastkey = Object.keys(res)[0]
            res = res[lastkey]['1. open']
            resstock.innerText = res.split('.')[0]

            return
        }
        console.log(res)
        var ul = document.createElement('ul')
        for (var elem of res) {
            var li = document.createElement('li')
            var aref = document.createElement('a')
            aref.href = elem.url
            aref.textContent = elem.value
            li.append(aref)
            ul.append(li)
        }
        resjoke.append(ul)
    } catch (err) { console.log(err) }
}
// rapid('stock', 'ibm')

var fetchjoke = document.getElementById('fetch-joke')
fetchjoke.focus()
fetchjoke.addEventListener('click', async (event) => {
    resjoke.innerText = ''
    rapid('joke')
})

document.getElementById('fetch-stock').addEventListener('click', async (event) => {
    resstock.innerText = ''
    rapid('stock', document.getElementById('symbol').value)
})
