
import * as utils from './utils.js';
import * as mongo from './mongo.js';
import axios from 'axios';

var query = `{
    repository(owner: "tik9", name: "fun") {
      refs(refPrefix: "refs/heads/", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 2) {
        edges {
          node {
            ... on Ref {
              name
              target {
                ... on Commit {
                  history(first: 4) {
                    edges {
                      node {
                        ... on Commit {
                          committedDate
                          message
                          commitUrl
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`

export async function handler(event) {
    var res
    try {
        res = (await axios.request({ url: process.env.gh_graph, method: 'POST', headers: { "Authorization": "bearer " + process.env.ghtoken, }, data: JSON.stringify({ query }) })).data
        res = res.data.repository.refs.edges

        // console.log(1, res)
        // mongo.truncate_coll(commits);
        // await mongo.insert_val(commits, res);
        // var res = await mongo.count(commits)

        return { statusCode: 200, body: JSON.stringify(res) };
    } catch (error) { console.log(error); }
}
