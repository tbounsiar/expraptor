"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_utils_1 = require("../../../core/crypto-utils");
var MemoryAuthenticator = /** @class */ (function () {
    function MemoryAuthenticator(authenticationBuilder) {
        this.authenticationBuilder = authenticationBuilder;
        this.store = {};
        this._digest = false;
    }
    MemoryAuthenticator.prototype.authenticate = function (login, password, options) {
        var user = this.store[login];
        if (user) {
            if (this._digest) {
                if (this.validate(user.password, password, options)) {
                    return user;
                }
            }
            else if (user.password === password) {
                // @ts-ignore
                delete user.memoryAuthenticator;
                return user;
            }
        }
        return undefined;
    };
    /**
     * Add new User
     * @param {string} login: user login
     * @param {string} password: user password
     */
    MemoryAuthenticator.prototype.addUser = function (login, password) {
        var user = new MemoryAuthentication(this, login, password);
        this.store[login] = user;
        return user;
    };
    /**
     * Activate WWW-Authenticate Digest
     */
    MemoryAuthenticator.prototype.digest = function () {
        this._digest = true;
        return this;
    };
    /**
     * Get Authentication Builder config
     */
    MemoryAuthenticator.prototype.and = function () {
        return this.authenticationBuilder;
    };
    // Validating hash.
    MemoryAuthenticator.prototype.validate = function (password, hash, options) {
        var ha1 = password;
        // Algorithm.
        if (options.algorithm === "MD5-sess") {
            ha1 = (0, crypto_utils_1.md5)("".concat(ha1, ":").concat(options.nonce, ":").concat(options.cnonce));
        }
        var response;
        // Quality of protection.
        if (options.qop) {
            response = (0, crypto_utils_1.md5)("".concat(ha1, ":").concat(options.nonce, ":").concat(options.nc, ":").concat(options.cnonce, ":").concat(options.qop, ":").concat(hash));
        }
        else {
            response = (0, crypto_utils_1.md5)("".concat(ha1, ":").concat(options.nonce, ":").concat(hash));
        }
        // If calculated response is equal to client's response.
        return response === options.response;
    };
    return MemoryAuthenticator;
}());
exports.default = MemoryAuthenticator;
var MemoryAuthentication = /** @class */ (function () {
    function MemoryAuthentication(memoryAuthenticator, login, password) {
        this.memoryAuthenticator = memoryAuthenticator;
        this.login = login;
        this.password = password;
        this.roles = [];
        this.authorities = [];
    }
    /**
     * Add roles to user
     * @param {string[]} roles: roles list
     */
    MemoryAuthentication.prototype.withRoles = function () {
        var roles = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            roles[_i] = arguments[_i];
        }
        this.roles = roles;
        return this;
    };
    /**
     * Add authorities to user
     * @param {string[]} authorities: authorities list
     */
    MemoryAuthentication.prototype.withAuthorities = function () {
        var authorities = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            authorities[_i] = arguments[_i];
        }
        this.authorities = authorities;
        return this;
    };
    /**
     * Get Memory Authenticator config
     */
    MemoryAuthentication.prototype.and = function () {
        return this.memoryAuthenticator;
    };
    return MemoryAuthentication;
}());
