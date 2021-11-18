"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64Decode = exports.base64Encode = exports.sha1 = exports.md5 = void 0;
var crypto_1 = __importDefault(require("crypto"));
function hash(input, algorithm) {
    var h = crypto_1.default.createHash(algorithm);
    h.update(input);
    return h.digest("hex");
}
function md5(input) {
    return hash(input, "MD5");
}
exports.md5 = md5;
function sha1(input) {
    return hash(input, "sha1");
}
exports.sha1 = sha1;
function base64Encode(input) {
    return Buffer.from(input, "utf8").toString("base64");
}
exports.base64Encode = base64Encode;
function base64Decode(input, encoding) {
    if (encoding === void 0) { encoding = "utf-8"; }
    return Buffer.from(input, "base64").toString(encoding);
}
exports.base64Decode = base64Decode;
