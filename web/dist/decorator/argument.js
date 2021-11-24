"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = exports.Request = exports.Param = exports.BodyParam = exports.Path = exports.QueryParam = exports.Header = exports.RequestBody = void 0;
var core_1 = require("@expraptor/core");
var util_1 = require("../core/util");
/**
 * Decorator indicating a method parameter should be bound to the body of the web request.
 * The body of the request is passed to resolve the method argument depending on the content type of the request.
 * Supported for decorated handler methods.
 * @constructor
 */
function RequestBody() {
    return function (target, propertyKey, parameterIndex) {
        argument(target, propertyKey, parameterIndex, core_1.ArgumentType.REQUEST_BODY);
    };
}
exports.RequestBody = RequestBody;
/**
 * Decorator which indicates that a method parameter should be bound to a web request header.
 * Supported for decorated handler methods.
 * @param {RequestHeader | string} key The key of the request header to bind to.
 * @constructor
 */
function Header(key) {
    return function (target, propertyKey, parameterIndex) {
        argument(target, propertyKey, parameterIndex, core_1.ArgumentType.HEADER, key);
    };
}
exports.Header = Header;
/**
 * Decorator which indicates that a method parameter should be bound to a web request query parameter.
 * Supported for decorated handler methods.
 * @param {string} key The key of the request query parameter to bind to.
 * @constructor
 */
function QueryParam(key) {
    return function (target, propertyKey, parameterIndex) {
        argument(target, propertyKey, parameterIndex, core_1.ArgumentType.QUERY, key);
    };
}
exports.QueryParam = QueryParam;
/**
 * Decorator which indicates that a method parameter should be bound to a URI template variable.
 * Supported for decorated handler methods.
 * @param {string} key The key of the path variable to bind to.
 * @constructor
 */
function Path(key) {
    return function (target, propertyKey, parameterIndex) {
        argument(target, propertyKey, parameterIndex, core_1.ArgumentType.PATH, key);
    };
}
exports.Path = Path;
/**
 * Decorator which indicates that a method parameter should be bound to a web request body parameter.
 * Supported for decorated handler methods.
 * @param {string} key The key of the request body parameter to bind to.
 * @constructor
 */
function BodyParam(key) {
    return function (target, propertyKey, parameterIndex) {
        argument(target, propertyKey, parameterIndex, core_1.ArgumentType.BODY, key);
    };
}
exports.BodyParam = BodyParam;
/**
 * Decorator which indicates that a method parameter should be bound to a web request parameter.
 * Supported for decorated handler methods.
 * @param {string} key The key of the request parameter to bind to.
 * @constructor
 */
function Param(key) {
    return function (target, propertyKey, parameterIndex) {
        argument(target, propertyKey, parameterIndex, core_1.ArgumentType.PARAM, key);
    };
}
exports.Param = Param;
/**
 * Decorator which indicates that a method parameter should be bound to a web request.
 * Supported for decorated handler methods.
 * @constructor
 */
function Request() {
    return function (target, propertyKey, parameterIndex) {
        argument(target, propertyKey, parameterIndex, core_1.ArgumentType.REQUEST);
    };
}
exports.Request = Request;
/**
 * Decorator which indicates that a method parameter should be bound to a web response.
 * Supported for decorated handler methods.
 * @constructor
 */
function Response() {
    return function (target, propertyKey, parameterIndex) {
        argument(target, propertyKey, parameterIndex, core_1.ArgumentType.RESPONSE);
    };
}
exports.Response = Response;
function argument(target, propertyKey, index, type, key) {
    if (!key) {
        var names = (0, util_1.getParamNames)(target[propertyKey]);
        key = names[index];
    }
    var store = target.prototype || target.constructor.prototype;
    if (!store._routes$) {
        store._routes$ = {};
    }
    if (!store._routes$[propertyKey]) {
        store._routes$[propertyKey] = {
            arguments: []
        };
    }
    var arg = {
        type: type,
        key: key,
        index: index
    };
    store._routes$[propertyKey].arguments.push(arg);
}
