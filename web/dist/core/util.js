"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParamNames = void 0;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(fn) {
    var str = fn.toString().replace(STRIP_COMMENTS, "");
    var result = str.slice(str.indexOf("(") + 1, str.indexOf(")")).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}
exports.getParamNames = getParamNames;
