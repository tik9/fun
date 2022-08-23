
git_code(['js/contact.min.js'])

var modalContent = document.getElementById('modal-content')
var modalTitle = document.getElementById('modal-title')
var reg_mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

var arr = ['name', 'email', 'message']

var input_nl = document.getElementById('nl-input')

async function mail(type = 'mail') {
    var obj = getObj()
    if (type == 'news') obj = { name: 'news', email: input_nl.value, message: 'Newsletter abo' }
    // console.log(2, type)

    try {
        return (await fetch('/.netlify/functions/mongo', { method: "post", body: JSON.stringify(obj) })).json()

    } catch (error) { console.log('res: ', error) }
}

function getObj() {
    var obj = {}
    var missing = []
    for (var elem of arr) {
        var val = document.getElementById(elem).value
        if (val == '') missing.push(elem)
        obj[elem] = val
    }
    if (reg_mail.test(document.getElementById('email').value) == false && missing.length == 0) missing.push('email')
    return missing.length != 0 ? missing : obj
}


var reset = document.getElementById('reset')
var send1 = document.getElementById('send1')
var mail_btn = document.getElementById('mail_btn')
var news_btn = document.getElementById('news_btn')
send1.focus()

send1.addEventListener("click", () => {
    mail_btn.style.display = 'block'
    modalTitle.textContent = 'Correct data entered?'
    if (Array.isArray(getObj())) {
        mail_btn.style.display = 'none'
        modalTitle.textContent = 'Data is missing or email is wrong'
    }
    modalContent.innerHTML = ''
    modalContent.append(list(getObj()))

})

document.getElementById('container').addEventListener("click", async (event) => {
    var btn = document.getElementById('final_close')
    btn.style.display = 'block'
    // btn.setAttribute('data-bs-dismiss', 'modal')

    var target = event.target
    var type = target.id.split('_')[0]
    if (target.classList.contains('send_btn')) {
        mail_btn.style.display = 'none'
        // console.log(type, reg_mail)
        if (reg_mail.test(input_nl.value) == false) {
            modalTitle.textContent = 'Address is missing/wrong'
            return
        }
        // var res = await mail(type)
        if (type == 'mail') { modalTitle.textContent = 'Data entered:' } else { modalTitle.textContent = input_nl.value + ' has been subscribed' }
    }
})

reset.addEventListener("click", () => { for (var elem of arr) document.getElementById(elem).value = '' });

// document.getElementById('final-close').addEventListener('click', () => { location.reload() })

if (location.hostname == 'localhost') {
    var count = 1
    for (var elem of arr) {
        document.getElementById(elem).value = 'a@' + count + '.'
        count++
    }
    // input_address_nl.value = 'a@a.'
}