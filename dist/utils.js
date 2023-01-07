"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncate = exports.byPropertiesOf = exports.sortTable = exports.sortList = exports.renameKeys = exports.format_bytes = exports.datetime = exports.handler = void 0;
const handler = async (event) => {
    var res;
    // return
    // console.log(2, res)
    if (typeof (event.body) === 'undefined' || event.body === '{}' || event.body === '') {
        var params = event.queryStringParameters.q;
        if (typeof (params) !== 'undefined')
            res = datetime(new Date(Number(params) * 1000));
    }
    else if (JSON.parse(event.body).type === 'sortList') {
        let jsbody = JSON.parse(event.body);
        sortList(jsbody.val);
        res = jsbody.val;
        // console.log(2, res)
    }
    else if (JSON.parse(event.body).type === 'sortTable') {
        let jsbody = JSON.parse(event.body);
        //@ts-ignore
        sortTable(jsbody.val, jsbody.sort1, jsbody.sort2);
        res = jsbody.val;
    }
    else {
        console.log(1, event.body);
        res = truncate(JSON.parse(event.body).val, JSON.parse(event.body).cut);
    }
    return {
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify(res), statusCode: 200
    };
};
exports.handler = handler;
function datetime(dateobj) {
    var dat = dateobj.toLocaleDateString('de-de');
    var time = dateobj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return dat + ' ' + time;
}
exports.datetime = datetime;
function format_bytes(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed() + ' ' + ['Bytes', 'KB', 'MB', 'GB'][i];
}
exports.format_bytes = format_bytes;
const renameKeys = (keys, obj) => Object.keys(obj).reduce((acc, key) => ({
    ...acc, ...{ [keys[key] || key]: obj[key] }
}), {});
exports.renameKeys = renameKeys;
function sortList(obj) {
    var keys = Object.keys(obj).sort((k1, k2) => {
        if (k1 < k2)
            return -1;
        else if (k1 > k2)
            return +1;
        else
            return 0;
    });
    let helpObj = {};
    for (var elem of keys) {
        //@ts-ignore
        helpObj[elem] = obj[elem];
        //@ts-ignore
        delete obj[elem];
        //@ts-ignore
        obj[elem] = helpObj[elem];
    }
    return obj;
}
exports.sortList = sortList;
/**
 * Sorts an array of T by the specified properties of T.
 *
 * @param arr - the array to be sorted, all of the same type T
 * @param sortBy - the names of the properties to sort by, in precedence order.
 */
function sortTable(arr, ...sortBy) {
    arr.sort(byPropertiesOf(sortBy));
    // console.log(2, arr, sortBy)
}
exports.sortTable = sortTable;
/**
 * Returns a comparator for objects of type T that can be used by sort
 * functions, were T objects are compared by the specified T properties.
 *
 * @param sortBy - the names of the properties to sort by, in precedence order.
 *                 Prefix any name with `-` to sort it in descending order.
 */
function byPropertiesOf(sortBy) {
    function compareByProperty(arg) {
        let key;
        let sortOrder = 1;
        if (typeof arg === 'string' && arg.startsWith('-')) {
            sortOrder = -1;
            // Typescript is not yet smart enough to infer that substring is keyof T
            key = arg.slice(1);
        }
        else
            // Likewise it is not yet smart enough to infer that arg here is keyof T
            key = arg;
        return (a, b) => {
            const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
            // console.log({ a, b, key, sortOrder })
            return result * sortOrder;
        };
    }
    return function (obj1, obj2) {
        let i = 0;
        let result = 0;
        const numberOfProperties = sortBy === null || sortBy === void 0 ? void 0 : sortBy.length;
        while (result === 0 && i < numberOfProperties) {
            result = compareByProperty(sortBy[i])(obj1, obj2);
            i++;
        }
        // console.log({ result, obj1, obj2 })
        return result;
    };
}
exports.byPropertiesOf = byPropertiesOf;
function truncate(text, size = 100) {
    text = text.replace(/<\/?(.*?)>/g, '');
    if (text.length > size) {
        var subString = text.slice(0, size);
        // console.log({ subString, text })
        return subString.slice(0, subString.lastIndexOf(" ")) + "..";
    }
    return text;
}
exports.truncate = truncate;
