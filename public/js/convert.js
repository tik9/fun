
convert(6, 5)
function convert(feet, inches) {
    const cmTotal = feet * 30.48 + inches * 2.54;

    const feetNew = Math.floor(cmTotal / 30.48);
    const inchesNew = (cmTotal - feetNew * 30.48) * 0.393701;

    var input = document.createElement('input')


    var convertdiv = document.getElementById('convert_feet')
    var btn = document.createElement('btn')
    btn.classList.add('btn', 'btn-primary')
    btn.addEventListener('click', event => {

        var items = ["New York", "Amsterdam"];

        var select = document.createElement("select");
        select.name = "city";
        select.id = "city"

        for (const val of items) {
            var option = document.createElement("option");
            option.value = val;
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            select.appendChild(option);
        }

        var label = document.createElement("label");
        label.innerHTML = "Select your City from the list: "
        label.htmlFor = "city";

        document.getElementById("list").appendChild(label).appendChild(select);

        var div = document.createElement('div')
        div.id = 'res'
        div.textContent = 'In cm: ' + cmTotal
        helper('info_' + arguments.callee.name, 'convert').append()
        // console.log(cmTotal)
    });
}