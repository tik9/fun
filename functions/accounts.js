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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
var handler = () => __awaiter(void 0, void 0, void 0, function* () {
    var cloud_arr = [
        { name: "stack", url: 'http://api.stackexchange.com/2.2/users/1705829?site=stackoverflow', link: 'link' },
        { name: "git", url: 'http://api.github.com/users/tik9', link: 'html_url' }
    ];
    var obj = {};
    for (var elem of cloud_arr) {
        var res = (yield axios_1.default.get(elem.url)).data;
        let name = elem.name;
        if (name == 'stack')
            res = res.items[0];
        obj[name] = res[elem.link];
    }
    return { statusCode: 200, body: JSON.stringify(obj) };
});
exports.handler = handler;
