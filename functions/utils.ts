
import { promises as fs } from "fs";
import { resolve } from 'path'
import { find } from './mongo'


export default async (req: Request) => {
    var res

    if ((new URL(req.url).searchParams).get('save'))
        res = await saveToFile()
    else {
        res = JSON.parse(await fs.readFile(resolve('public', 'json/website.json'), 'utf-8'))
        sortTable(res, 'cat', 'text')
        console.log(1, res, 2)
    }

    return new Response(JSON.stringify(res), {
        headers: { 'access-control-allow-origin': '*' }
    })
}

export async function saveToFile() {
    var res = JSON.stringify(await find('data'))
    fs.writeFile(resolve('public', 'json/website.json'), res, 'utf-8')
    return res
}

export function datetime(dateobj: Date) {
    var dat = dateobj.toLocaleDateString('de-de')
    var time = dateobj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return dat + ' ' + time
}

export function format_bytes(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed() + ' ' + ['Bytes', 'KB', 'MB', 'GB'][i];
}

export function sortList(obj: object) {

    var keys = Object.keys(obj).sort((k1, k2) => {
        if (k1 < k2) return -1;
        else if (k1 > k2) return +1;
        else return 0;
    });
    let helpObj = {}
    for (var elem of keys) {
        //@ts-ignore
        helpObj[elem] = obj[elem];
        //@ts-ignore
        delete obj[elem];
        //@ts-ignore
        obj[elem] = helpObj[elem]
    }
    return obj;
}

/**
 * Sorts an array of T by the specified properties of T.
 *
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

export function truncate(text: string, size = 100) {
    text = text.replace(/<\/?(.*?)>/g, '');
    if (text.length > size) {
        var subString = text.slice(0, size);
        // console.log({ subString, text })
        return subString.slice(0, subString.lastIndexOf(" ")) + "..";
    }
    return text
}