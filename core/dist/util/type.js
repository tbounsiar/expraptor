"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusMessage = void 0;
var enum_1 = require("./enum");
exports.HttpStatusMessage = (_a = {},
    _a[enum_1.HttpSuccessCode.OK] = "OK",
    _a[enum_1.HttpSuccessCode.CREATED] = "Created",
    _a[enum_1.HttpClientErrorCode.BAD_REQUEST] = "Bad Request",
    _a[enum_1.HttpClientErrorCode.UNAUTHORIZED] = "Unauthorized",
    _a[enum_1.HttpClientErrorCode.PAYMENT_REQUIRED] = "Payment Required",
    _a[enum_1.HttpClientErrorCode.FORBIDDEN] = "Forbidden",
    _a[enum_1.HttpClientErrorCode.NOT_FOUND] = "Not Found",
    _a[enum_1.HttpServerErrorCode.INTERNAL_SERVER_ERROR] = "Internal Server Error",
    _a);
