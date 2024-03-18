
import { promises as fs } from 'fs'
import { resolve } from "path"

let json = import.meta.url.split('/').pop().split('.')[0]
json = resolve('public', 'json', `${json}.json`)


export default async (req: Request) => {
    let res// res = JSON.parse(await fs.readFile(json, 'utf-8'))
    // if (new URL(req.url).searchParams.get('date')) 
    let query = new URL(req.url).searchParams.get('date')
    if (/^\d\d\.\d\d\.\d\d\d\d$/.test(query))
        res = locale_date(query)
    return new Response(JSON.stringify(res))
}


export function locale_date(date) {
    if (date === new Date().toLocaleDateString('de-de', { day: '2-digit', month: '2-digit', year: 'numeric' }))
        return 'today'

    Array(5).fill(1).map((_, i) => {
        let day = new Date(new Date().setDate(new Date().getDate() - i)).toLocaleDateString('de-de', { day: '2-digit', month: '2-digit', year: 'numeric' })
        if (day === date && i === 1)
            date = 'yesterday'
        else if (day === date)
            date = i + ' days ago'
    })

    return date
}

async function getGhGraphSchema() {
    let minimum = 1, maximum = 10
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    let query = `query {
        __schema {
          types {
            name
            kind
            description
            fields {
              name
            }
          }
        }
      }`
    return (await getGhGraph(query)).data.__schema.types[randomnumber]
}

export async function getGhGraph(query: any, jsonVars = {}) {
    let res = await (await fetch('https://api.github.com/graphql', { method: 'POST', headers: { "Authorization": "bearer " + process.env.ghtoken }, body: JSON.stringify({ query: query, variables: jsonVars }) })).json()
    // console.log(res)
    return res
}


export function truncate(text: string, size = 100) {
    text = text.replace(/<\/?(.*?)>/g, '');
    if (text.length > size) {
        let subString = text.slice(0, size);
        return subString.slice(0, subString.lastIndexOf(" ")) + "..";
    }
    return text
}

export function format_bytes(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed() + ' ' + ['Bytes', 'KB', 'MB', 'GB'][i];
}

export function sortList(obj: object) {

    let keys = Object.keys(obj).sort((k1, k2) => {
        if (k1 < k2) return -1;
        else if (k1 > k2) return +1;
        else return 0;
    });
    let helpObj = {}
    for (let elem of keys) {
        helpObj[elem] = obj[elem];
        delete obj[elem];
        obj[elem] = helpObj[elem]
    }
    return obj;
}

/**
 * Sorts an array of T by the specified properties of T.
  * @param arr - the array to be sorted, all of the same type T
 * @param sortBy - the names of the properties to sort by, in precedence order.
 */
export function sortTable<T extends object>(arr: T[], ...sortBy: Array<sortArg<T>>) {
    arr.sort(byPropertiesOf<T>(sortBy))
    // console.log(2, arr, sortBy)
}

type sortArg<T> = keyof T | `-${string & keyof T}`

/**
 * Returns a comparator for objects of type T that can be used by sort
 * functions, were T objects are compared by the specified T properties.
 *
 * @param sortBy - the names of the properties to sort by, in precedence order.
 *                 Prefix any name with `-` to sort it in descending order.
 */
export function byPropertiesOf<T extends object>(sortBy: Array<sortArg<T>>) {
    function compareByProperty(arg: sortArg<T>) {
        let key: keyof T
        let sortOrder = 1
        if (typeof arg === 'string' && arg.startsWith('-')) {
            sortOrder = -1
            // Typescript is not yet smart enough to infer that substring is keyof T
            key = arg.slice(1) as keyof T
        } else
            // Likewise it is not yet smart enough to infer that arg here is keyof T
            key = arg as keyof T

        return (a: T, b: T) => {
            const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
            // console.log({ a, b, key, sortOrder })
            return result * sortOrder
        }
    }

    return function (obj1: T, obj2: T) {
        let i = 0
        let result = 0
        const numberOfProperties = sortBy?.length
        while (result === 0 && i < numberOfProperties) {
            result = compareByProperty(sortBy[i])(obj1, obj2)
            i++
        }
        // console.log({ result, obj1, obj2 })
        return result
    }
}

async function rate() {
    return await getGhGraph(`query {viewer {login}rateLimit {limit remaining resetAt}}`)
}