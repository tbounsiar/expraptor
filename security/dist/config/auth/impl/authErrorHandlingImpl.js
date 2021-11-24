"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@expraptor/core");
var AuthErrorHandlingImpl = /** @class */ (function () {
    function AuthErrorHandlingImpl() {
    }
    AuthErrorHandlingImpl.prototype.forbidden = function (_, response) {
        response.status(core_1.HttpClientErrorCode.FORBIDDEN).send("".concat(core_1.HttpClientErrorCode.FORBIDDEN, " ").concat(core_1.HttpStatusMessage[core_1.HttpClientErrorCode.FORBIDDEN]));
    };
    AuthErrorHandlingImpl.prototype.unauthorized = function (_, response) {
        response.status(core_1.HttpClientErrorCode.UNAUTHORIZED).send("".concat(core_1.HttpClientErrorCode.UNAUTHORIZED, " ").concat(core_1.HttpStatusMessage[core_1.HttpClientErrorCode.UNAUTHORIZED]));
    };
    return AuthErrorHandlingImpl;
}());
exports.default = AuthErrorHandlingImpl;
