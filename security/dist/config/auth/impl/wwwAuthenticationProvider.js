"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for WWW-Authenticate implementation
 */
var WWWAuthenticationProvider = /** @class */ (function () {
    function WWWAuthenticationProvider(authenticationBuilder) {
        this.authenticationBuilder = authenticationBuilder;
        this._realm = "@expraptor/security Application";
        this._proxy = false;
    }
    /**
     * Set WWW-Authenticate realm
     * @param {string} realm realm value
     */
    WWWAuthenticationProvider.prototype.realm = function (realm) {
        this._realm = realm;
        return this;
    };
    /**
     * Activate WWW-Authenticate proxy authentication
     */
    WWWAuthenticationProvider.prototype.proxy = function () {
        this._proxy = true;
        return this;
    };
    /**
     * Get Authentication Builder config
     */
    WWWAuthenticationProvider.prototype.and = function () {
        return this.authenticationBuilder;
    };
    WWWAuthenticationProvider.prototype.getAskHeader = function (error) {
        var key = "".concat(this._proxy ? "Proxy" : "WWW", "-Authenticate");
        var value = this.getAskHeaderValue(error);
        return [key, value];
    };
    WWWAuthenticationProvider.prototype.getAuthorization = function (request) {
        var authorization = request.headers["".concat(this._proxy ? "proxy-" : "", "authorization")];
        if (typeof authorization !== "string") {
            return undefined;
        }
        return authorization;
    };
    WWWAuthenticationProvider.AUTHORIZATION = "Authorization";
    return WWWAuthenticationProvider;
}());
exports.default = WWWAuthenticationProvider;
