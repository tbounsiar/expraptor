"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestAuthenticationImpl = /** @class */ (function () {
    function RequestAuthenticationImpl(authentication) {
        this.authentication = authentication;
        this.roles = [];
        this.authorities = [];
        if (this.authentication) {
            this.authorities = authentication.authorities || [];
            this.roles = authentication.roles || [];
        }
    }
    RequestAuthenticationImpl.prototype.hasAuthority = function (authority) {
        return this.authorities.indexOf(authority) !== -1;
    };
    RequestAuthenticationImpl.prototype.hasAnyAuthorities = function () {
        var authorities = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            authorities[_i] = arguments[_i];
        }
        for (var _a = 0, authorities_1 = authorities; _a < authorities_1.length; _a++) {
            var authority = authorities_1[_a];
            if (this.hasAuthority(authority)) {
                return true;
            }
        }
        return false;
    };
    RequestAuthenticationImpl.prototype.hasRole = function (role) {
        return this.roles.indexOf(role) !== -1;
    };
    RequestAuthenticationImpl.prototype.hasAnyRoles = function () {
        var roles = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            roles[_i] = arguments[_i];
        }
        for (var _a = 0, roles_1 = roles; _a < roles_1.length; _a++) {
            var role = roles_1[_a];
            if (this.hasRole(role)) {
                return true;
            }
        }
        return false;
    };
    RequestAuthenticationImpl.prototype.isAuthenticated = function () {
        return !!this.authentication;
    };
    return RequestAuthenticationImpl;
}());
exports.default = RequestAuthenticationImpl;
