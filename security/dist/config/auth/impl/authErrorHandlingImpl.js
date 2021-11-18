"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@expraptor/core");
var AuthErrorHandlingImpl = /** @class */ (function () {
    function AuthErrorHandlingImpl() {
    }
    AuthErrorHandlingImpl.prototype.forbidden = function (response) {
        response.status(core_1.HttpClientErrorCode.FORBIDDEN).send(core_1.HttpClientErrorCode.FORBIDDEN + " " + core_1.HttpStatusMessage[core_1.HttpClientErrorCode.FORBIDDEN]);
    };
    AuthErrorHandlingImpl.prototype.unauthorized = function (response) {
        response.status(core_1.HttpClientErrorCode.UNAUTHORIZED).send(core_1.HttpClientErrorCode.UNAUTHORIZED + " " + core_1.HttpStatusMessage[core_1.HttpClientErrorCode.UNAUTHORIZED]);
    };
    return AuthErrorHandlingImpl;
}());
exports.default = AuthErrorHandlingImpl;
