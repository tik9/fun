"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncate = exports.sort_ = exports.format_bytes = exports.sort = exports.byPropertiesOf = exports.handler = void 0;
const handler = async (event) => {
    var res = JSON.parse(event.body).arr;
    sort(res, 'category');
    return { body: JSON.stringify(res), statusCode: 200 };
};
exports.handler = handler;
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
        return result;
    };
}
exports.byPropertiesOf = byPropertiesOf;
/**
 * Sorts an array of T by the specified properties of T.
 *
 * @param arr - the array to be sorted, all of the same type T
 * @param sortBy - the names of the properties to sort by, in precedence order.
 */
function sort(arr, ...sortBy) {
    // console.log(2, arr)
    arr.sort(byPropertiesOf(sortBy));
}
exports.sort = sort;
function format_bytes(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed() + ' ' + ['Bytes', 'KB', 'MB', 'GB'][i];
}
exports.format_bytes = format_bytes;
function sort_(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.slice(1);
    }
    return (obj1 = {}, obj2 = {}) => {
        var result = (obj1[property] < obj2[property]) ? -1 : (obj1[property] > obj2[property]) ? 1 : 0;
        return result * sortOrder;
    };
}
exports.sort_ = sort_;
function truncate(text, size = 100) {
    text = text.replace(/<\/?(.*?)>/g, "");
    if (text.length > size) {
        var subString = text.slice(0, size);
        var body = subString.slice(0, subString.lastIndexOf(" ")) + "..";
        return body;
    }
    return text;
}
exports.truncate = truncate;
