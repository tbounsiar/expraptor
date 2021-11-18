"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwtRequestAuthentication_1 = __importDefault(require("./jwtRequestAuthentication"));
var JwtTokenParser = /** @class */ (function () {
    function JwtTokenParser(jwtTokenAuthenticationProvider) {
        this.jwtTokenAuthenticationProvider = jwtTokenAuthenticationProvider;
    }
    JwtTokenParser.prototype.parse = function (token) {
        var jwt = require("jsonwebtoken");
        if (!jwt) {
            throw new Error("Package jsonwebtoken not yet installed, please do `npm i -S jsonwebtoken and retry`");
        }
        try {
            var decoded = jwt.verify(token, this.jwtTokenAuthenticationProvider.secret());
            return new jwtRequestAuthentication_1.default(decoded, this.jwtTokenAuthenticationProvider.jwtAuthorization());
        }
        catch (error) {
            throw new Error("Invalid Token");
        }
    };
    return JwtTokenParser;
}());
exports.default = JwtTokenParser;
