"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trace = exports.put = exports.post = exports.patch = exports.options = exports.head = exports.get = exports.del = exports.route = void 0;
var core_1 = require("@expraptor/core");
var core_2 = require("../core");
/**
 * Decorator for mapping HTTP requests onto specific handler methods.
 * @param {@link RouteOption} HTTP mapping option
 * @constructor
 */
function route(option) {
    return function (target, propertyKey, descriptor) {
        (0, core_2.setHandler)(option, target, propertyKey, descriptor);
    };
}
exports.route = route;
/**
 * Decorator for mapping HTTP DELETE requests onto specific handler methods.
 * @param {RouteOption} option HTTP DELETE mapping option
 * @constructor
 */
function del(option) {
    return route(__assign(__assign({}, option), { method: core_1.HttpMethod.DELETE }));
}
exports.del = del;
/**
 * Decorator for mapping HTTP GET requests onto specific handler methods.
 * @param {RouteOption} option HTTP GET mapping option
 * @constructor
 */
function get(option) {
    return route(__assign(__assign({}, option), { method: core_1.HttpMethod.GET }));
}
exports.get = get;
/**
 * Decorator for mapping HTTP HEAD requests onto specific handler methods.
 * @param {RouteOption} option HTTP HEAD mapping option
 * @constructor
 */
function head(option) {
    return route(__assign(__assign({}, option), { method: core_1.HttpMethod.HEAD }));
}
exports.head = head;
/**
 * Decorator for mapping HTTP OPTIONS requests onto specific handler methods.
 * @param {import("@expraptor/core").RouteOption} option HTTP OPTIONS mapping option
 * @constructor
 */
function options(option) {
    return route(__assign(__assign({}, option), { method: core_1.HttpMethod.OPTIONS }));
}
exports.options = options;
/**
 * Decorator for mapping HTTP PATCH requests onto specific handler methods.
 * @param {RouteOption} option HTTP PATCH mapping option
 * @constructor
 */
function patch(option) {
    return route(__assign(__assign({}, option), { method: core_1.HttpMethod.PATCH }));
}
exports.patch = patch;
/**
 * Decorator for mapping HTTP POST requests onto specific handler methods.
 * @param {RouteOption} option HTTP POST mapping option
 * @constructor
 */
function post(option) {
    return route(__assign(__assign({}, option), { method: core_1.HttpMethod.POST }));
}
exports.post = post;
/**
 * Decorator for mapping HTTP PUT requests onto specific handler methods.
 * @param {RouteOption} option HTTP PUT mapping option
 * @constructor
 */
function put(option) {
    return route(__assign(__assign({}, option), { method: core_1.HttpMethod.PUT }));
}
exports.put = put;
/**
 * Decorator for mapping HTTP TRACE requests onto specific handler methods.
 * @param {RouteOption} option HTTP TRACE mapping option
 * @constructor
 */
function trace(option) {
    return route(__assign(__assign({}, option), { method: core_1.HttpMethod.TRACE }));
}
exports.trace = trace;
