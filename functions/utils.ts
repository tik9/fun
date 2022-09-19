
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
    var { fun, param, length } = event.queryStringParameters!
    // console.log(1, fun, param, length)
    var res
    if (fun == 'bytes') res = formatBytes(Number(param))
    else res = truncate(param!, Number(length))
    return { body: JSON.stringify(res), statusCode: 200 }
}

export function formatBytes(bytes: number) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed() + ' ' + sizes[i];
}

export function sort(property: string) {
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