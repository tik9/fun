
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
    var res = JSON.parse(event.body!).arr
    sort(res, 'category')
    return { body: JSON.stringify(res), statusCode: 200 }
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
        } else {
            // Likewise it is not yet smart enough to infer that arg here is keyof T
            key = arg as keyof T
        }
        return function (a: T, b: T) {
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

export function format_bytes(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed() + ' ' + ['Bytes', 'KB', 'MB', 'GB'][i];
}

export function sort_(property: string) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.slice(1);
    }
    return (obj1: { [key: string]: string; } = {}, obj2: { [key: string]: string; } = {}) => {
        var result = (obj1[property] < obj2[property]) ? -1 : (obj1[property] > obj2[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export function truncate(text: string, size = 100) {
    text = text.replace(/<\/?(.*?)>/g, "");
    if (text.length > size) {
        var subString = text.slice(0, size);
        var body = subString.slice(0, subString.lastIndexOf(" ")) + "..";
        return body
    }
    return text
}