"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sessionAuthenticationProvider_1 = __importDefault(require("./impl/sessionAuthenticationProvider"));
var formLogin_1 = __importDefault(require("./formLogin"));
var memoryAuthenticator_1 = __importDefault(require("./impl/memoryAuthenticator"));
var authErrorHandlingImpl_1 = __importDefault(require("./impl/authErrorHandlingImpl"));
var jwtTokenAuthenticationProvider_1 = __importDefault(require("./token/jwt/jwtTokenAuthenticationProvider"));
var authenticateType_1 = require("./iface/authenticateType");
var digestWebAuthenticationProvider_1 = __importDefault(require("./impl/digestWebAuthenticationProvider"));
var basicWebAuthenticationProvider_1 = __importDefault(require("./impl/basicWebAuthenticationProvider"));
var AuthenticationBuilder = /** @class */ (function () {
    function AuthenticationBuilder() {
        this._authenticationProvider = new sessionAuthenticationProvider_1.default();
        this._formLogin = new formLogin_1.default(this);
        this._errorHandling = new authErrorHandlingImpl_1.default();
        this._redirect = true;
        this.redirectUrl = "/";
        this._stateless = false;
    }
    AuthenticationBuilder.prototype.stateless = function () {
        delete this._authenticationProvider;
        delete this._formLogin;
        this._stateless = true;
        this._redirect = false;
        return this;
    };
    AuthenticationBuilder.prototype.inMemoryUser = function () {
        var authenticator = new memoryAuthenticator_1.default(this);
        this._authenticator = authenticator;
        return authenticator;
    };
    AuthenticationBuilder.prototype.jwtTokenAuthentication = function (secret) {
        var jwt = require("jsonwebtoken");
        if (!jwt) {
            throw new Error("Package jsonwebtoken seems not to be installed, please do `npm i -S jsonwebtoken and retry`");
        }
        var authenticationProvider = new jwtTokenAuthenticationProvider_1.default(this, secret);
        this._authenticationProvider = authenticationProvider;
        return authenticationProvider;
    };
    AuthenticationBuilder.prototype.basicAuthentication = function () {
        var authenticationProvider = new basicWebAuthenticationProvider_1.default(this.stateless());
        this._authenticationProvider = authenticationProvider;
        this._authenticateType = authenticateType_1.AuthenticateType.BASIC;
        return authenticationProvider;
    };
    AuthenticationBuilder.prototype.digestAuthentication = function () {
        var authenticationProvider = new digestWebAuthenticationProvider_1.default(this.stateless());
        this._authenticationProvider = authenticationProvider;
        this._authenticateType = authenticateType_1.AuthenticateType.DIGEST;
        return authenticationProvider;
    };
    AuthenticationBuilder.prototype.formLogin = function () {
        if (this._stateless) {
            console.warn("FormLogin not allowed on stateless");
            return null;
        }
        if (!this._formLogin) {
            this._formLogin = new formLogin_1.default(this);
        }
        return this._formLogin;
    };
    AuthenticationBuilder.prototype.errorHandling = function (errorHandling) {
        if (errorHandling) {
            this._errorHandling = errorHandling;
            return this;
        }
        return this._errorHandling;
    };
    AuthenticationBuilder.prototype.authenticationProvider = function (authenticationProvider) {
        if (authenticationProvider) {
            this._authenticationProvider = authenticationProvider;
            return this;
        }
        return this._authenticationProvider;
    };
    AuthenticationBuilder.prototype.authenticator = function (authenticator) {
        if (authenticator === undefined) {
            return this._authenticator;
        }
        this._authenticator = authenticator;
        return this;
    };
    AuthenticationBuilder.prototype.redirectTo = function (url) {
        this.redirectUrl = url;
        this._redirect = true;
        return this;
    };
    AuthenticationBuilder.prototype.isRedirect = function () {
        return this._redirect;
    };
    AuthenticationBuilder.prototype.isStateless = function () {
        return this._stateless;
    };
    AuthenticationBuilder.prototype.authenticateType = function () {
        return this._authenticateType;
    };
    AuthenticationBuilder.prototype.enable = function (application) {
        if (this._stateless || !this._formLogin) {
            return;
        }
        this._formLogin.enable(application);
    };
    return AuthenticationBuilder;
}());
exports.default = AuthenticationBuilder;
