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
var webAuthenticationProvider_1 = __importDefault(require("./webAuthenticationProvider"));
var crypto_utils_1 = require("../../../core/crypto-utils");
var CREDENTIALS_REGEXP = /^basic\s(.*)/i;
var USER_PASS_REGEXP = /^([^:]*):(.*)$/;
/**
 * Class for WWW-Authenticate Basic implementation
 */
var BasicWebAuthenticationProvider = /** @class */ (function (_super) {
    __extends(BasicWebAuthenticationProvider, _super);
    function BasicWebAuthenticationProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._charset = "utf-8";
        return _this;
    }
    BasicWebAuthenticationProvider.prototype.getAskHeaderValue = function () {
        return "Basic realm=\"" + this._realm + "\", charset=\"" + this._charset + "\"";
    };
    /**
     * Set WWW-Authenticate Digest charset
     * @param {BufferEncoding} charset: charset value
     */
    BasicWebAuthenticationProvider.prototype.charset = function (charset) {
        this._charset = charset;
        return this;
    };
    BasicWebAuthenticationProvider.prototype.parse = function (authorization) {
        // parse header
        var match = CREDENTIALS_REGEXP.exec(authorization);
        if (!match) {
            return undefined;
        }
        // decode user pass
        var userPassword = USER_PASS_REGEXP.exec((0, crypto_utils_1.base64Decode)(match[1]));
        if (!userPassword) {
            return undefined;
        }
        return {
            login: userPassword[1],
            password: userPassword[2]
        };
    };
    return BasicWebAuthenticationProvider;
}(webAuthenticationProvider_1.default));
exports.default = BasicWebAuthenticationProvider;
