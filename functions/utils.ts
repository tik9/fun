
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
    var res
    var body = event.body!
    // console.log(1, body)

    if (typeof (body) == 'undefined' || body == '{}' || body == '') {
        var params = event.queryStringParameters!.q
        // console.log(1, params)
        if (typeof (params) != 'undefined') res = datetime(new Date(Number(params) * 1000))
    }
    else res = truncate(JSON.parse(body).input)

    return {
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify(res), statusCode: 200
    }
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

export const renameKeys = <
    TNewkey extends string, T extends Record<string, unknown>
>(
    keys: { [key: string]: TNewkey },
    obj: T
) => Object.keys(obj).reduce((acc, key) => ({
    ...acc, ...{ [keys[key] || key]: obj[key] }
}), {});


/**
 * Sorts an array of T by the specified properties of T.
 *
 * @param arr - the array to be sorted, all of the same type T
 * @param sortBy - the names of the properties to sort by, in precedence order.
 */
export function sort<T extends object>(arr: T[], ...sortBy: Array<sortArg<T>>) {
    // console.log(2, arr)
    arr.sort(byPropertiesOf<T>(sortBy))
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
        return result
    }
}

export function truncate(text: string, size = 100) {
    text = text.replace(/<\/?(.*?)>/g, '');
    if (text.length > size) {
        var subString = text.slice(0, size);
        return subString.slice(0, subString.lastIndexOf(" ")) + "..";
    }
    return text
}