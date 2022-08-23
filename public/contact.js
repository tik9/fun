
var modalContent = document.getElementById('modal-content')

git_code(['js/contact.min.js'])

var reg_mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
var email_contact = 'contact_input'
var arr = ['name', email_contact, 'message', 'nl_input']

var contact_input = document.getElementById(email_contact)
var nl_input = document.getElementById('nl_input')

async function mail(type = 'mail') {
    var obj = getObj()
    delete Object.assign(obj, { ['email']: obj[email_contact] })[email_contact];

    if (type == 'news') obj = { name: 'news', email: nl_input.value, message: 'Newsletter abo' }

    try {
        return (await fetch('/.netlify/functions/mail', { method: "post", body: JSON.stringify(obj) })).json()
    } catch (error) { console.log('res: ', error) }
}

function getObj() {
    var obj = {}
    var missing = []
    for (var elem of arr.slice(0, -1)) {
        var val = document.getElementById(elem).value
        if (val == '') missing.push(elem)
        obj[elem] = val
    }
    if (reg_mail.test(contact_input.value) == false && missing.length == 0) missing.push('email')
    return missing.length != 0 ? missing : obj
}

var reset = document.getElementById('reset')
var send1 = document.getElementById('send1')
var news_btn = document.getElementById('news_btn')
news_btn.focus()

send1.addEventListener("click", () => {
    mail_btn.style.display = 'block'
    modalTitle.textContent = contact_input.value + ', Correct data entered?'
    if (Array.isArray(getObj())) {
        mail_btn.style.display = 'none'
        modalTitle.textContent = 'Data is missing or email is wrong'
    }
    modalContent.innerHTML = ''
    modalContent.append(list(getObj()))
})

document.body.addEventListener("click", async (event) => {
    var target = event.target
    if (target.classList.contains('send_btn')) {
        document.getElementById('final_close').style.display = 'block'
        var type = target.id.split('_')[0]
        // console.log(type, target)
        mail_btn.style.display = 'none'

        if (type == 'mail') {
            try { await mail(type) } catch (error) { console.log(1, error) }
            modalTitle.textContent = contact_input.value + ', Data entered:'
            return
        }
        else if (reg_mail.test(nl_input.value) == false) modalTitle.textContent = 'Address is missing/wrong'
        else {
            modalTitle.textContent = nl_input.value + ' has been subscribed'
            try { await mail(type) } catch (error) { console.log(1, error) }
        }
        modalContent.innerHTML = ''
    }
})

reset.addEventListener("click", () => { for (var elem of arr) document.getElementById(elem).value = '' });

// document.getElementById('final-close').addEventListener('click', () => { location.reload() })

// console.log(location.hostname)
if (location.hostname == 'localhost') {
    var count = 1
    for (var elem of arr) {
        document.getElementById(elem).value = 'a@' + count + '.1'
        count++
    }
}