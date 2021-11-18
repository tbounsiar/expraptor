"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServerErrorCode = exports.HttpClientErrorCode = exports.HttpSuccessCode = exports.HttpMethod = exports.ArgumentType = void 0;
var ArgumentType;
(function (ArgumentType) {
    ArgumentType["PATH"] = "path";
    ArgumentType["QUERY"] = "query";
    ArgumentType["HEADER"] = "header";
    ArgumentType["BODY"] = "body";
    ArgumentType["REQUEST_BODY"] = "request_body";
    ArgumentType["PARAM"] = "param";
    ArgumentType["REQUEST"] = "request";
    ArgumentType["RESPONSE"] = "response";
    ArgumentType["NEXT"] = "next";
})(ArgumentType = exports.ArgumentType || (exports.ArgumentType = {}));
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "get";
    HttpMethod["HEAD"] = "head";
    HttpMethod["POST"] = "post";
    HttpMethod["PUT"] = "put";
    HttpMethod["DELETE"] = "delete";
    HttpMethod["CONNECT"] = "connect";
    HttpMethod["OPTIONS"] = "options";
    HttpMethod["TRACE"] = "trace";
    HttpMethod["PATCH"] = "patch";
    HttpMethod["ALL"] = "all";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var HttpSuccessCode;
(function (HttpSuccessCode) {
    HttpSuccessCode[HttpSuccessCode["OK"] = 200] = "OK";
    HttpSuccessCode[HttpSuccessCode["CREATED"] = 201] = "CREATED";
    // ACCEPTED = 202,
    // NON_AUTHORITATIVE_INFORMATION = 203,
    // NO_CONTENT = 204,
    // RESET_CONTENT = 205,
    // PARTIAL_CONTENT = 206,
    // MULTI_STATUS = 207,
    // ALREADY_REPORTED = 208,
    // CONTENT_DIFFERENT = 210,
    // IM_USED = 226,
})(HttpSuccessCode = exports.HttpSuccessCode || (exports.HttpSuccessCode = {}));
var HttpClientErrorCode;
(function (HttpClientErrorCode) {
    HttpClientErrorCode[HttpClientErrorCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpClientErrorCode[HttpClientErrorCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpClientErrorCode[HttpClientErrorCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    HttpClientErrorCode[HttpClientErrorCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpClientErrorCode[HttpClientErrorCode["NOT_FOUND"] = 404] = "NOT_FOUND";
})(HttpClientErrorCode = exports.HttpClientErrorCode || (exports.HttpClientErrorCode = {}));
var HttpServerErrorCode;
(function (HttpServerErrorCode) {
    HttpServerErrorCode[HttpServerErrorCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpServerErrorCode = exports.HttpServerErrorCode || (exports.HttpServerErrorCode = {}));
