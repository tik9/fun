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
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const mailg = (0, mailgun_js_1.default)({ apiKey: process.env.mailgun, domain: 'sandbox155be01191ff49929c48ce437f0feb28.mailgun.org' });
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    // from = 't<a@b.c>'
    // msg = 1
    var from, msg;
    if (event.body) {
        var body = JSON.parse(event.body);
        from = body.name + ' <' + body.email + '>';
        msg = body.message;
        yield mailg.messages().send({
            from: from,
            to: 'timo@tik1.net',
            subject: "website",
            text: msg
        });
    }
    return {
        statusCode: 200,
        body: JSON.stringify('from mg')
    };
});
exports.handler = handler;
