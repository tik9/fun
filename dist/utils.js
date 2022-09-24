"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncate = exports.sort = exports.formatBytes = exports.handler = void 0;
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var { param } = event.queryStringParameters;
    var res;
    if (typeof (event.body) == 'undefined')
        res = formatBytes(Number(param));
    else {
        var body = JSON.parse(event.body);
        // console.log(1, body, 2, 2, typeof (event.body) == 'undefined')
        res = truncate(body.body.key, Number(body.body.length));
    }
    return { body: JSON.stringify(res), statusCode: 200 };
});
exports.handler = handler;
function formatBytes(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed() + ' ' + sizes[i];
}
exports.formatBytes = formatBytes;
function sort(property) {
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
exports.sort = sort;
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
