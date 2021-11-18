"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenAuthenticationProvider = /** @class */ (function () {
    function TokenAuthenticationProvider(authenticationBuilder) {
        this.authenticationBuilder = authenticationBuilder;
        this._bearer = false;
    }
    TokenAuthenticationProvider.prototype.getAuthentication = function (request) {
        var authorization = request.get(TokenAuthenticationProvider.AUTHORIZATION);
        if (!authorization) {
            throw new Error("Unknown token");
        }
        if (this._bearer) {
            authorization = authorization.replace("Bearer ", "");
        }
        return this._tokenParser.parse(authorization);
    };
    TokenAuthenticationProvider.prototype.tokenParser = function (tokenParser) {
        this._tokenParser = tokenParser;
        return this;
    };
    TokenAuthenticationProvider.prototype.bearer = function () {
        this._bearer = true;
        return this;
    };
    TokenAuthenticationProvider.prototype.and = function () {
        return this.authenticationBuilder;
    };
    TokenAuthenticationProvider.AUTHORIZATION = "Authorization";
    return TokenAuthenticationProvider;
}());
exports.default = TokenAuthenticationProvider;
