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
exports.CONNECT = exports.TRACE = exports.HEAD = exports.OPTIONS = exports.DELETE = exports.PATCH = exports.PUT = exports.POST = exports.GET = exports.Route = void 0;
var core_1 = require("@expraptor/core");
var core_2 = require("../core");
/**
 * Decorator for mapping HTTP requests onto specific handler methods.
 * @param {@link RouteOption} HTTP mapping option
 * @constructor
 */
function Route(option) {
    return function (target, propertyKey, descriptor) {
        (0, core_2.setHandler)(option, target, propertyKey, descriptor);
    };
}
exports.Route = Route;
/**
 * Decorator for mapping HTTP GET requests onto specific handler methods.
 * @param {RouteOption} option HTTP GET mapping option
 * @constructor
 */
function GET(option) {
    return Route(__assign(__assign({}, option), { method: core_1.HttpMethod.GET }));
}
exports.GET = GET;
/**
 * Decorator for mapping HTTP POST requests onto specific handler methods.
 * @param {RouteOption} option HTTP POST mapping option
 * @constructor
 */
function POST(option) {
    return Route(__assign(__assign({}, option), { method: core_1.HttpMethod.POST }));
}
exports.POST = POST;
/**
 * Decorator for mapping HTTP PUT requests onto specific handler methods.
 * @param {RouteOption} option HTTP PUT mapping option
 * @constructor
 */
function PUT(option) {
    return Route(__assign(__assign({}, option), { method: core_1.HttpMethod.PUT }));
}
exports.PUT = PUT;
/**
 * Decorator for mapping HTTP PATCH requests onto specific handler methods.
 * @param {RouteOption} option HTTP PATCH mapping option
 * @constructor
 */
function PATCH(option) {
    return Route(__assign(__assign({}, option), { method: core_1.HttpMethod.PATCH }));
}
exports.PATCH = PATCH;
/**
 * Decorator for mapping HTTP DELETE requests onto specific handler methods.
 * @param {RouteOption} option HTTP DELETE mapping option
 * @constructor
 */
function DELETE(option) {
    return Route(__assign(__assign({}, option), { method: core_1.HttpMethod.DELETE }));
}
exports.DELETE = DELETE;
/**
 * Decorator for mapping HTTP OPTIONS requests onto specific handler methods.
 * @param {import("@expraptor/core").RouteOption} option HTTP OPTIONS mapping option
 * @constructor
 */
function OPTIONS(option) {
    return Route(__assign(__assign({}, option), { method: core_1.HttpMethod.OPTIONS }));
}
exports.OPTIONS = OPTIONS;
/**
 * Decorator for mapping HTTP HEAD requests onto specific handler methods.
 * @param {RouteOption} option HTTP HEAD mapping option
 * @constructor
 */
function HEAD(option) {
    return Route(__assign(__assign({}, option), { method: core_1.HttpMethod.HEAD }));
}
exports.HEAD = HEAD;
/**
 * Decorator for mapping HTTP TRACE requests onto specific handler methods.
 * @param {RouteOption} option HTTP TRACE mapping option
 * @constructor
 */
function TRACE(option) {
    return Route(__assign(__assign({}, option), { method: core_1.HttpMethod.TRACE }));
}
exports.TRACE = TRACE;
/**
 * Decorator for mapping HTTP CONNECT requests onto specific handler methods.
 * @param {import("@expraptor/core").RouteOption} option HTTP CONNECT mapping option
 * @constructor
 */
function CONNECT(option) {
    return Route(__assign(__assign({}, option), { method: core_1.HttpMethod.CONNECT }));
}
exports.CONNECT = CONNECT;
