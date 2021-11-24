"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHandler = void 0;
var core_1 = require("@expraptor/core");
var util_1 = require("./util");
var template_1 = require("./template");
function setHandler(option, target, propertyKey, descriptor) {
    var store = target.prototype || target.constructor.prototype;
    var routes = store._routes$;
    if (!routes) {
        routes = {};
        store._routes$ = routes;
    }
    var route = routes[propertyKey];
    if (!route) {
        route = {};
        store._routes$[propertyKey] = route;
    }
    route.method = option.method || core_1.HttpMethod.ALL;
    route.path = option.path || "";
    route.middlewares = option.middlewares;
    var names = (0, util_1.getParamNames)(descriptor.value);
    if (names.length > 0 && (!route.arguments || names.length !== route.arguments.length)) {
        if (route.arguments) {
            route.arguments.forEach(function (argument) {
                var index = names.indexOf(argument.key);
                if (index !== -1) {
                    names.splice(index, 1);
                }
            });
        }
        throw Error("Non decorated for ".concat(target.name, " route ").concat(descriptor.value.name, " function args [").concat(names.join(", "), "];"));
    }
    var args = [];
    if (route.arguments) {
        route.arguments.forEach(function (argument) {
            switch (argument.type) {
                case core_1.ArgumentType.PATH:
                    args[argument.index] = "request.params[\"".concat(argument.key, "\"]");
                    break;
                case core_1.ArgumentType.QUERY:
                case core_1.ArgumentType.BODY:
                    args[argument.index] = "request[\"".concat(argument.type, "\"][\"").concat(argument.key, "\"]");
                    break;
                case core_1.ArgumentType.PARAM:
                    var key = store._routes$[propertyKey].method === core_1.HttpMethod.POST ? "body" : "query";
                    args[argument.index] = "request[\"".concat(key, "\"][\"").concat(argument.key, "\"]");
                    break;
                case core_1.ArgumentType.HEADER:
                    args[argument.index] = "request.get(\"".concat(argument.key, "\")");
                    break;
                case core_1.ArgumentType.REQUEST_BODY:
                    args[argument.index] = "request.body";
                    break;
                case core_1.ArgumentType.REQUEST:
                    args[argument.index] = "request";
                    break;
                case core_1.ArgumentType.RESPONSE:
                    args[argument.index] = "response";
                    break;
            }
        });
    }
    var call = "const ret = descriptor.value.call(this);";
    if (args.length > 0) {
        call = "const args = [];";
        args.forEach(function (value, index) {
            call += "\n        args[".concat(index, "] = ").concat(value, ";");
        });
        call += "\n        const ret = descriptor.value.call(this, ...args);";
    }
    var status = option.status && option.status !== 200 ? ".status(".concat(option.status, ")") : "";
    var format = option.format || "send";
    var headersText = "";
    if (option.headers) {
        for (var key in option.headers) {
            var value = option.headers[key];
            headersText += "\n            response.set(\"".concat(key, "\", \"").concat(value, "\");");
        }
    }
    var View = require("../model/view");
    var handlerText = (0, template_1.handlerTemplate)(call, headersText, status, format);
    var handler = eval(handlerText);
    route.handler = handler;
}
exports.setHandler = setHandler;
