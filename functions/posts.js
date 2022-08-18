
import * as file from './file'
import * as utils from './utils'

export async function handler(event, context) {
    // var content = JSON.parse((await fs.readFile(path.resolve('json', 'posts_in.json'))).toString())
    // console.log(content)
    // fs.writeFile(path.resolve('json', 'posts.json'), JSON.stringify(content))
    // return

    try {
        for (var elem of ["comments", "posts"]) {
            var res = await fetch(`https://api.stackexchange.com/2.2/users/1705829/${elem}?site=stackoverflow&filter=withbody`);

            res = (await res.json()).items.slice(0, 8);

            res.sort(utils.sortOne('-score'));
            res = res.map(obj => (
                obj.creation_date ? {
                    date: new Date(obj.creation_date * 1000).toISOString().substring(0, 10),
                    text: utils.truncate(obj.body),
                    score: obj.score,
                    cat: obj.comment_id ? 'comments' : 'posts',
                    url: obj.link ? obj.link : 'https://stackexchange.com/users/1886776/timo?tab=activity',
                } : {}))
            // file.writeJs('posts', res)
            file.add_removeJs('posts', res)
        }
        return {
            body: JSON.stringify(res),
            statusCode: 200
        }
    } catch (error) { console.log(2, error) }
}