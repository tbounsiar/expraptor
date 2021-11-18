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
var tokenAuthenticationProvider_1 = __importDefault(require("../tokenAuthenticationProvider"));
var jwtTokenParser_1 = __importDefault(require("./jwtTokenParser"));
var JwtTokenAuthenticationProvider = /** @class */ (function (_super) {
    __extends(JwtTokenAuthenticationProvider, _super);
    function JwtTokenAuthenticationProvider(authenticationBuilder, _secret) {
        var _this = _super.call(this, authenticationBuilder) || this;
        _this._secret = _secret;
        _this.tokenParser(new jwtTokenParser_1.default(_this));
        return _this;
    }
    JwtTokenAuthenticationProvider.prototype.secret = function () {
        return this._secret;
    };
    JwtTokenAuthenticationProvider.prototype.jwtAuthorization = function (jwtAuthorization) {
        if (!jwtAuthorization) {
            return this._jwtAuthorization;
        }
        this._jwtAuthorization = jwtAuthorization;
        return this;
    };
    return JwtTokenAuthenticationProvider;
}(tokenAuthenticationProvider_1.default));
exports.default = JwtTokenAuthenticationProvider;
