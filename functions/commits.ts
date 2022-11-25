
import { Handler } from '@netlify/functions';
import { axiosHelp } from './query';


export var handler: Handler = async (event) => {
  var repo = event.queryStringParameters!.repo
  var res = await commits(repo!)
  return { statusCode: 200, body: JSON.stringify(res) };
}

async function commits(repo: string) {
  var query = `query {
    repository(owner: "tik9", name: "${repo}") {
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
  return (await axiosHelp(query)).data.repository.refs.edges[0].node.target.history.edges
}