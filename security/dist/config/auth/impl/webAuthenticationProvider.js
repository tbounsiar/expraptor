"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var requestAuthenticationImpl_1 = __importDefault(require("./requestAuthenticationImpl"));
/**
 * Class for WWW-Authenticate implementation
 */
var WebAuthenticationProvider = /** @class */ (function () {
    function WebAuthenticationProvider(authenticationBuilder) {
        this.authenticationBuilder = authenticationBuilder;
        this._realm = "@expraptor/security Application";
        this._proxy = false;
    }
    WebAuthenticationProvider.prototype.getAuthentication = function (request) {
        var user = this.getUser(request);
        if (!user) {
            throw new Error("Need Authentication");
        }
        return new requestAuthenticationImpl_1.default(this.authenticate(user));
    };
    /**
     * Set WWW-Authenticate realm
     * @param {string} realm realm value
     * @return WebAuthenticationProvider
     */
    WebAuthenticationProvider.prototype.realm = function (realm) {
        this._realm = realm;
        return this;
    };
    /**
     * Activate WWW-Authenticate proxy authentication
     */
    WebAuthenticationProvider.prototype.proxy = function () {
        this._proxy = true;
        return this;
    };
    /**
     * Get Authentication Builder config
     */
    WebAuthenticationProvider.prototype.and = function () {
        return this.authenticationBuilder;
    };
    WebAuthenticationProvider.prototype.getAskHeader = function () {
        var key = (this._proxy ? "Proxy" : "WWW") + "-Authenticate";
        var value = this.getAskHeaderValue();
        return [key, value];
    };
    WebAuthenticationProvider.prototype.authenticate = function (user) {
        var authentication;
        if (this.authenticationBuilder.authenticator()) {
            // @ts-ignore
            authentication = this.authenticationBuilder.authenticator().authenticate(user.login, user.password, user.options);
        }
        return authentication;
    };
    WebAuthenticationProvider.prototype.getUser = function (request) {
        var authorization = this.getAuthorization(request);
        if (!authorization) {
            return undefined;
        }
        return this.parse(authorization, request);
    };
    WebAuthenticationProvider.prototype.getAuthorization = function (request) {
        var authorization = request.headers[(this._proxy ? "proxy-" : "") + "authorization"];
        if (typeof authorization !== "string") {
            return undefined;
        }
        return authorization;
    };
    return WebAuthenticationProvider;
}());
exports.default = WebAuthenticationProvider;
