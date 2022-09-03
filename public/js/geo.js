
geo_information()
async function geo_information() {
    var res = await (await fetch('/.netlify/functions/geo')).json()
    // console.log(res)
    var { ip, hostname, loc, postal, org, date, ...res } = res
    helper(arguments.callee.name, 'client').append(list(res, 'geo'))

}