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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
var url = 'https://api.github.com/graphql';
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var query = `{repositoryOwner(login: "tik9") { repositories (orderBy: { field: PUSHED_AT, direction: DESC }, first: 3) { nodes { name description homepageUrl pushedAt }}}}`;
    var res = (yield axios_1.default.request({
        url: url,
        method: 'POST',
        headers: { "Authorization": "bearer " + process.env.ghtoken, },
        data: JSON.stringify({ query })
    })).data;
    res = res.data.repositoryOwner.repositories.nodes;
    res = res.map((_a) => {
        var { name: repo, description, homepageUrl: url, pushedAt } = _a, rest = __rest(_a, ["name", "description", "homepageUrl", "pushedAt"]);
        return (Object.assign({ repo, description, date: pushedAt.substring(0, 10), url }, rest));
    });
    // console.log(res)
    return { statusCode: 200, body: JSON.stringify(res) };
});
exports.handler = handler;
