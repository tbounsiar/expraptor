"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@expraptor/core");
var template_1 = require("../core/template");
var utils_1 = require("../core/utils");
var path_to_regexp_1 = require("path-to-regexp");
var http_1 = require("./http");
var auth_1 = require("./auth");
var Configurator = /** @class */ (function () {
    function Configurator(application, change, test) {
        if (change === void 0) { change = true; }
        if (test === void 0) { test = false; }
        this.application = application;
        this._httpSecurity = new http_1.HttpSecurity();
        this._authenticationBuilder = new auth_1.AuthenticationBuilder();
        this.enable(change, test);
    }
    Configurator.prototype.httpSecurity = function () {
        return this._httpSecurity;
    };
    Configurator.prototype.buildAuth = function () {
        return this._authenticationBuilder;
    };
    Configurator.prototype.secure = function (route, path) {
        var permission = { authenticated: false, authorization: "", permit: false };
        var routePath = "".concat(path).concat((0, utils_1.getPath)(route.path));
        var middlewareText = template_1.forbiddenTemplate;
        var matchers = (0, utils_1.getMatchers)(this._httpSecurity, routePath, route.method);
        if (matchers.length > 0) {
            var permitAll = matchers.find(function (matcher) { return matcher.permissions().indexOf(http_1.RequestMatcher.PERMIT_ALL) !== -1; });
            if (permitAll) {
                if (route.authorization) {
                    permission.authorization = (0, utils_1.getAuthorization)(route);
                }
                else {
                    // No need to add security middleware
                    permission.permit = true;
                    return;
                }
            }
            else {
                (0, utils_1.updatePermission)(permission, matchers);
            }
        }
        if (permission.authenticated || permission.authorization) {
            var authorizedText = permission.authorization ? (0, template_1.authorizedTemplate)(permission.authorization) : "";
            middlewareText = (0, template_1.middlewareTemplate)(this, authorizedText, this._authenticationBuilder.authenticateType());
        }
        var middleware = (0, utils_1.getMiddleware)(this._authenticationBuilder, middlewareText);
        if (!route.middlewares) {
            route.middlewares = [];
        }
        route.middlewares.splice(0, 0, middleware);
    };
    /**
     * Enable security after configuration
     */
    Configurator.prototype.enable = function (change, test) {
        var _this = this;
        if (change === void 0) { change = true; }
        if (test === void 0) { test = false; }
        var origins = {};
        if (change) {
            var methods = __spreadArray(["use"], Object.values(core_1.HttpMethod), true);
            methods.forEach(function (method) {
                var origin = _this.application[method];
                origins[method] = origin;
                // @ts-ignore
                _this.application[method] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    // if (typeof args[0] === "string") {
                    method = method === "use" || method === "all" ? undefined : method;
                    // @ts-ignore
                    var middleware = _this.middleware(args[0], method);
                    if (middleware) {
                        args.splice(1, 0, middleware);
                    }
                    // }
                    origin.call.apply(origin, __spreadArray([_this.application], args, false));
                };
            });
        }
        // @ts-ignore
        var listen = this.application.listen;
        // @ts-ignore
        this.application.listen = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (change) {
                for (var key in origins) {
                    _this.application[key] = origins[key];
                }
            }
            _this._authenticationBuilder.enable(_this.application);
            _this._httpSecurity.enable(_this.application);
            // @ts-ignore
            if (!test) {
                listen.call.apply(listen, __spreadArray([_this.application], args, false));
            }
        };
    };
    Configurator.prototype.middleware = function (path, method) {
        if (!this._authenticationBuilder.isStateless()) {
            var formLogin = this._authenticationBuilder.formLogin();
            var loginPageRegex = (0, path_to_regexp_1.pathToRegexp)(formLogin.loginPage() || auth_1.FormLogin.DEFAULT_LOGIN_PAGE);
            var loginUrlRegex = (0, path_to_regexp_1.pathToRegexp)(formLogin.loginUrl() || auth_1.FormLogin.DEFAULT_LOGIN_URL);
            var logoutUrlRegex = (0, path_to_regexp_1.pathToRegexp)(formLogin.logoutUrl() || auth_1.FormLogin.DEFAULT_LOGOUT_URL);
            if (loginPageRegex.test(path) || loginUrlRegex.test(path) || logoutUrlRegex.test(path)) {
                return null;
            }
        }
        var permission = { authenticated: false, authorization: "", permit: false };
        var routePath = path;
        var middlewareText = template_1.forbiddenTemplate;
        var matchers = (0, utils_1.getMatchers)(this._httpSecurity, routePath, method);
        if (matchers.length > 0) {
            var permitAll = matchers.find(function (matcher) { return matcher.permissions().indexOf(http_1.RequestMatcher.PERMIT_ALL) !== -1; });
            if (permitAll) {
                // no need to add security middleware
                return null;
            }
            else {
                (0, utils_1.updatePermission)(permission, matchers);
            }
        }
        if (permission.authenticated || permission.authorization) {
            var authorizedText = permission.authorization ? (0, template_1.authorizedTemplate)(permission.authorization) : "";
            middlewareText = (0, template_1.middlewareTemplate)(this, authorizedText, this._authenticationBuilder.authenticateType());
        }
        var middleware = (0, utils_1.getMiddleware)(this._authenticationBuilder, middlewareText);
        return middleware;
    };
    return Configurator;
}());
exports.default = Configurator;
