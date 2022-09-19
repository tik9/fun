
var ul = document.createElement('ul')

convert()
async function convert() {
    var elem = await indexfun(arguments.callee.name + '_feet_cm')
    convertHelp('incm', 170, 204, 1)
    convertHelp('infeet', 4, 7, 0.1)
    elem.append(ul)
}

function convertHelp(type, ...args) {
    var out = document.createElement("div");
    out.classList.add('mt-3')
    var to = document.createElement("select");

    to.id = 'select_' + type
    to.setAttribute('data-test', to.id)
    // to.classList.add('form-control', 'w-auto')
    // to.style.width = 'auto'
    out.id = 'out_' + type
    out.setAttribute('data-test', out.id)
    out.textContent = 'Result waits..'
    var decimal = (type == 'incm') ? 0 : 1

    var typeSlice = type.slice(0, 2) + ' ' + type.slice(2)
    to.innerHTML = '<option>' + typeSlice + '</option>'

    var [start, stop, step] = args
    var range = Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

    to.innerHTML += range.map(x => '<option val=' + x.toFixed(decimal) + '>' + x.toFixed(decimal) + '</option>')
    var li = document.createElement('li')
    li.style.display = 'inline-block'
    li.classList.add('me-4')
    ul.append(li)
    li.append(to, out)

    to.addEventListener('change', () => {
        out.textContent = ''
        var input = to.value
        var output = document.createElement('span')
        if (type == 'infeet') {
            var inputSplit = input.split('.')
            output.textContent = ', output: ' + (inputSplit[0] * 30.48 + inputSplit[1] * 2.54).toFixed() + ' cm'
        } else {
            var inches = (input * 0.393700787).toFixed();
            var feet = Math.floor(inches / 12);
            inches %= 12;
            output.textContent = ', output: ' + feet + ' feet, ' + inches + ' inches';
        }
        var inputspan = document.createElement('span')
        inputspan.textContent = 'input ' + typeSlice + ': ' + input
        inputspan.style.fontWeight = 'bold'
        out.append(inputspan, output)
    });
}