
async function tests() {
    var tests = arguments.callee.name

    var res = await (await fetch('/dir/cypress/e2e')).json()
    var arr = []
    var linessum = 0
    for (var elem of res) {
        var file = elem.file
        var lines = elem.lines
        var url = gitBase + '/cypress/e2e/' + file
        arr.push({ file, lines, url })
        linessum = linessum + lines
    }
    var div = document.createElement('div')
    div.classList.add('mt-3');
    (await indexfun(tests)).append(table(arr, tests), document.createTextNode('Number of lines of test code: ' + linessum), div)
}