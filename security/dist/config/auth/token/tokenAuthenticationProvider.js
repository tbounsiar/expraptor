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
var wwwAuthenticationProvider_1 = __importDefault(require("../impl/wwwAuthenticationProvider"));
var tokenError_1 = __importDefault(require("./tokenError"));
var TokenAuthenticationProvider = /** @class */ (function (_super) {
    __extends(TokenAuthenticationProvider, _super);
    function TokenAuthenticationProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TokenAuthenticationProvider.prototype.getAuthentication = function (request) {
        var authorization = this.getAuthorization(request);
        if (!authorization) {
            throw new tokenError_1.default("Unknown token");
        }
        authorization = authorization.replace("Bearer ", "");
        return this._tokenParser.parse(authorization);
    };
    TokenAuthenticationProvider.prototype.tokenParser = function (tokenParser) {
        this._tokenParser = tokenParser;
        return this;
    };
    TokenAuthenticationProvider.prototype.getAskHeaderValue = function (error) {
        var header = [
            "Bearer realm=\"".concat(this._realm, "\"")
        ];
        if (error.name) {
            header.push("error=\"".concat(error.name, "\""));
        }
        if (error.description) {
            header.push("error_description=\"".concat(error.description, "\""));
        }
        return header.join(", ");
    };
    return TokenAuthenticationProvider;
}(wwwAuthenticationProvider_1.default));
exports.default = TokenAuthenticationProvider;
