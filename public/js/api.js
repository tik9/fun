
var apiheaders = {
    joke: 'Fetch Jokes - enter keyword e.g. abc', trans: 'Fetch translation en -> de - e.g. ace ', clock: 'Get UTC Time',
}

async function api() {
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

        var btn = document.createElement('button')
        btn.classList.add('ms-2', 'mt-2', 'btn', 'btn-primary')
        var btnElem = 'btn' + elem
        btn.id = btnElem
        btn.textContent = 'Fetch'
        btn.setAttribute('data-test', btnElem)
        if (!['clock'].includes(elem)) {
            var input = document.createElement('input')
            input.placeholder = 'abc or piz or ..'
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
    document.getElementById('btntrans').addEventListener('click', () => rapid('trans', document.getElementById('inputtrans')))

    document.getElementById('btnclock').addEventListener('click', async () => {
        var innerHtml = document.getElementById('resclock')
        innerHtml.innerHTML = ''
        var res = await (await fetch('https://worldtimeapi.org/api/timezone/Europe/london')).json()
        innerHtml.innerHTML = res.utc_datetime.split('T')[1].slice(0, 5) + ' hours'
    })
}

// rapid('joke', { value: 'abc' })
async function rapid(type, input) {
    var resdiv = document.getElementById('res' + type)
    resdiv.innerHTML = ''
    var inputval = typeof (input) == 'undefined' ? '' : 'input=' + input.value
    if (type == 'joke') {
        try {
            var res = await (await fetch(net_fun + 'rapid?' + inputval)).json()
            res = res.result.map(({ categories, created_at, icon_url, id, updated_at, ...keepAttrs }) => keepAttrs)
            var tab = table(res, 'joke')
            resdiv.append(tab)
            new JSTable(tab)
        } catch (error) { console.log(1, error) }
    }
    else {
        var res = await (await fetch(net_fun + 'rapid', {
            method: 'post', body: JSON.stringify({ q: input.value })
        })).json()

        resdiv.innerText = res.data.translations[0].translatedText
    }
}