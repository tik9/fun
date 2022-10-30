
import { Handler } from '@netlify/functions';
import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

var id = "f6aa0186"

function helper(res: any) {
    var lex_entry = res.results[0].lexicalEntries[0]
    var definition = lex_entry.entries[0].senses[0].definitions[0]
    var phrases = lex_entry.phrases[0].text
    return { def: definition, phr: phrases }
}

export const handler: Handler = async (event) => {
    var Dictionary = require("oxford-dictionaries-api");
    var dict = new Dictionary(id, process.env.oxford);

    var res = await dict.entries({ word_id: event.queryStringParameters!.word })
    return {
        statusCode: 200,
        body: JSON.stringify(helper(res))
    }
}


export async function dic2(word: string) {
    const options = {
        url: 'https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/' + word,
        headers: {
            'app_id': id,
            'app_key': process.env.oxford!
        }
    };
    var res = await axios.request(options)

    // console.log(res.data)
    console.log(helper(res.data))
}
