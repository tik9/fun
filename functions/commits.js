import * as utils from './modules/utils.js';
import * as mongo from './mongo.js';

export async function handler(event) {
    var gh_url = 'https://api.github.com/users/tik9/repos';
    var commits = 'commits';
    try {
        gh_url = 'https://api.github.com/repos/tik9/fun/commits';
        var res = await (await fetch(gh_url)).json();

        res = res.map((obj) => ({
            date: obj.commit.author.date.substring(0, 10),
            message: obj.commit.message,
            url: obj.html_url,
        }));
        res = res.sort(utils.sort('-date')).slice(0, 4);
        console.log(res)
        mongo.truncate_coll(commits);
        await mongo.insert_val(commits, res);
        // var res = await mongo.count(commits)

        return { statusCode: 200, body: JSON.stringify(res) };
    } catch (error) {
        console.log(error);
    }
}
