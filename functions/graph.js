
import axios from "axios";

const query = `
  query issues {
    repository(owner:"tik9", name:"fun") {
      issues(last:3) {
       totalCount,
        edges {
          node {
            createdAt
              body
              title
              url
          }
        }
      }
    }
  }`;

export const handler = async (event) => {
    // var res = await (await fetch('https://api.github.com/graphql', {
    //     method: 'POST',
    //     body: JSON.stringify({ query }),
    //     headers: {
    //         'Authorization': `Bearer ${process.env.ghtoken}`,
    //     }
    // })).json()

    var options = {
        url: 'https://api.github.com/graphql',
        method: 'POST',
        data: JSON.stringify({ query }),
        headers: { 'Authorization': `Bearer ${process.env.ghtoken}`, },
    };
    var res = (await axios.request(options)).data

    // console.log(1, res.data.repository.issues)
    return {
        statusCode: 200,
        body: JSON.stringify(res.data.repository.issues)
    }
}