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
var requestAuthenticationImpl_1 = __importDefault(require("../../impl/requestAuthenticationImpl"));
var JwtRequestAuthentication = /** @class */ (function (_super) {
    __extends(JwtRequestAuthentication, _super);
    function JwtRequestAuthentication(decodedJwtToken, jwtAuthorization) {
        var _this = _super.call(this, decodedJwtToken) || this;
        _this.decodedJwtToken = decodedJwtToken;
        if (jwtAuthorization) {
            _this.roles = jwtAuthorization.getRoles(_this.decodedJwtToken);
            _this.authorities = jwtAuthorization.getAuthorities(_this.decodedJwtToken);
        }
        return _this;
    }
    JwtRequestAuthentication.prototype.isAuthenticated = function () {
        return !!this.decodedJwtToken;
    };
    return JwtRequestAuthentication;
}(requestAuthenticationImpl_1.default));
exports.default = JwtRequestAuthentication;
