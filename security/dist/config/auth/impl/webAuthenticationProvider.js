"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var wwwAuthenticationProvider_1 = __importDefault(require("./wwwAuthenticationProvider"));
var requestAuthenticationImpl_1 = __importDefault(require("./requestAuthenticationImpl"));
var WebAuthenticationProvider = /** @class */ (function (_super) {
    __extends(WebAuthenticationProvider, _super);
    function WebAuthenticationProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebAuthenticationProvider.prototype.getAuthentication = function (request) {
        var user = this.getUser(request);
        if (!user) {
            throw new Error("Need Authentication");
        }
        return new requestAuthenticationImpl_1.default(this.authenticate(user));
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
    return WebAuthenticationProvider;
}(wwwAuthenticationProvider_1.default));
exports.default = WebAuthenticationProvider;
