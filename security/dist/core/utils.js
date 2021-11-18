"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMiddleware = exports.getMatchers = exports.getAuthorization = exports.updatePermission = exports.getPath = void 0;
var core_1 = require("@expraptor/core");
var path_to_regexp_1 = require("path-to-regexp");
var http_1 = require("../config/http");
function getPath(path) {
    if (path.startsWith("/")) {
        return path;
    }
    return "/" + path;
}
exports.getPath = getPath;
function updatePermission(permission, matchers) {
    var permissions = [];
    matchers.forEach(function (matcher) {
        matcher.permissions().forEach(function (p) {
            if (p === http_1.RequestMatcher.AUTHENTICATED) {
                permission.authenticated = true;
            }
            else {
                permissions.push("authentication." + p);
            }
        });
    });
    if (permissions.length > 0) {
        permission.authorization = permissions.join(" || ");
    }
}
exports.updatePermission = updatePermission;
function getAuthorization(route) {
    var args = {};
    if (route.arguments) {
        route.arguments.forEach(function (argument) {
            switch (argument.type) {
                case core_1.ArgumentType.PATH:
                    args[argument.key] = "request.params[\"" + argument.key + "\"]";
                    break;
                case core_1.ArgumentType.QUERY:
                case core_1.ArgumentType.BODY:
                    args[argument.key] = "request[\"" + argument.type + "\"][\"" + argument.key + "\"]";
                    break;
                case core_1.ArgumentType.PARAM:
                    var key = route.method === core_1.HttpMethod.POST ? "body" : "query";
                    args[argument.key] = "request[\"" + key + "\"][\"" + argument.key + "\"]";
                    break;
                case core_1.ArgumentType.HEADER:
                    args[argument.key] = "request.get(\"" + argument.key + "\")";
                    break;
                case core_1.ArgumentType.REQUEST_BODY:
                    args[argument.key] = "request.body";
                    break;
                case core_1.ArgumentType.REQUEST:
                    args[argument.key] = "request";
                    break;
                case core_1.ArgumentType.RESPONSE:
                    args[argument.key] = "response";
                    break;
                case core_1.ArgumentType.NEXT:
                    args[argument.key] = "next";
                    break;
                default:
                    throw Error("Unknown argument " + argument.key + " type");
                    break;
            }
        });
    }
    var authorization = route.authorization.replace(/\$\./g, "authentication.")
        .replace(/AND/g, "&&")
        .replace(/OR/g, "||");
    var regExp = /(?:^|[ (,])#([a-zA-Z]+)/gm;
    var result = regExp.exec(authorization);
    while (result !== null) {
        if (result.index === regExp.lastIndex) {
            regExp.lastIndex++;
        }
        if (!args[result[1]]) {
            throw Error("Unknown " + result[1] + " args");
        }
        authorization = authorization.replace("#" + result[1], args[result[1]]);
        result = regExp.exec(authorization);
    }
    return authorization;
}
exports.getAuthorization = getAuthorization;
function getMatchers(httpSecurity, path, method) {
    return httpSecurity.authorize().matchers().filter(function (matcher) {
        var regex = (0, path_to_regexp_1.pathToRegexp)(matcher.regex());
        if (regex.test(path)) {
            if (matcher.methods() && matcher.methods().length > 0) {
                // @ts-ignore
                if (matcher.methods().includes(method)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        }
        return false;
    });
}
exports.getMatchers = getMatchers;
function getMiddleware(authenticationBuilder, middlewareText) {
    var middleware = eval(middlewareText);
    return middleware;
}
exports.getMiddleware = getMiddleware;
