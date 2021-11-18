"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestMatcher = /** @class */ (function () {
    function RequestMatcher(authorizeRequests, _regex) {
        this.authorizeRequests = authorizeRequests;
        this._regex = _regex;
        this._permissions = [];
    }
    RequestMatcher.prototype.withMethod = function () {
        var methods = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            methods[_i] = arguments[_i];
        }
        this._methods = methods;
        return this;
    };
    RequestMatcher.prototype.methods = function () {
        return this._methods;
    };
    RequestMatcher.prototype.regex = function () {
        return this._regex;
    };
    RequestMatcher.prototype.permissions = function () {
        return this._permissions;
    };
    RequestMatcher.prototype.permitAll = function () {
        this._permissions.push(RequestMatcher.PERMIT_ALL);
        return this.authorizeRequests;
    };
    RequestMatcher.prototype.authenticated = function () {
        this._permissions.push(RequestMatcher.AUTHENTICATED);
        return this.authorizeRequests;
    };
    RequestMatcher.prototype.hasRole = function (role) {
        this._permissions.push("hasRole(\"" + role + "\")");
        return this;
    };
    RequestMatcher.prototype.hasAnyRoles = function () {
        var roles = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            roles[_i] = arguments[_i];
        }
        this._permissions.push("hasAnyRoles(" + roles.map(function (role) { return "\"" + role + "\""; }).join(", ") + ")");
        return this;
    };
    RequestMatcher.prototype.hasAuthority = function (authority) {
        this._permissions.push("hasAuthority(\"" + authority + "\")");
        return this;
    };
    RequestMatcher.prototype.hasAnyAuthorities = function () {
        var authorities = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            authorities[_i] = arguments[_i];
        }
        this._permissions.push("hasAnyAuthorities(" + authorities.map(function (authority) { return "\"" + authority + "\""; }).join(", ") + ")");
        return this;
    };
    RequestMatcher.prototype.and = function () {
        return this.authorizeRequests;
    };
    RequestMatcher.PERMIT_ALL = "PERMIT_ALL";
    RequestMatcher.AUTHENTICATED = "AUTHENTICATED";
    return RequestMatcher;
}());
exports.default = RequestMatcher;
