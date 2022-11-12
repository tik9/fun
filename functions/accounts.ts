
import axios from 'axios'

export var handler = async () => {
    var cloud_arr = [
        { name: "stack", url: 'https://api.stackexchange.com/2.2/users/1705829?site=stackoverflow', link: 'link' },
        { name: "git", url: 'https://api.github.com/users/tik9', link: 'html_url' }
    ]
    var obj: Object = {}
    for (var elem of cloud_arr) {
        var res = (await axios.get(elem.url)).data
        let name = elem.name
        if (name == 'stack') res = res.items[0]
        obj[name as keyof Object] = res[elem.link]
    }
    return { statusCode: 200, body: JSON.stringify(obj) }
}
