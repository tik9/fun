
geo_information()
async function geo_information() {
    var res = await (await fetch('/.netlify/functions/geo')).json()
    // console.log(res)
    // ['city', 'region', 'country', 'timezone']
    var { ip, hostname, loc, postal, org, ...res } = res
    helper(arguments.callee.name, 'client').append(list(res, 'geo'))

}