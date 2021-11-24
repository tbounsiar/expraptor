"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServerErrorCode = exports.HttpClientErrorCode = exports.HttpSuccessCode = exports.HttpMethod = exports.ArgumentType = void 0;
/**
 * The routes arguments types
 * @enum
 */
var ArgumentType;
(function (ArgumentType) {
    /**
     * Request Path Variable Type
     */
    ArgumentType["PATH"] = "path";
    /**
     * Request Query Parameter Type
     */
    ArgumentType["QUERY"] = "query";
    /**
     * Request Header Type
     */
    ArgumentType["HEADER"] = "header";
    /***
     * Body Param Type
     */
    ArgumentType["BODY"] = "body";
    /**
     * Request Body Type
     */
    ArgumentType["REQUEST_BODY"] = "request_body";
    /**
     * Request Param Type
     */
    ArgumentType["PARAM"] = "param";
    /**
     * Http Request Type
     */
    ArgumentType["REQUEST"] = "request";
    /**
     * Http Response Type
     */
    ArgumentType["RESPONSE"] = "response";
    /*,
    NEXT = "next"*/
})(ArgumentType = exports.ArgumentType || (exports.ArgumentType = {}));
/**
 * Http Methods
 * @enum
 */
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["ALL"] = "all";
    HttpMethod["DELETE"] = "delete";
    HttpMethod["GET"] = "get";
    HttpMethod["HEAD"] = "head";
    HttpMethod["OPTIONS"] = "options";
    HttpMethod["PATCH"] = "patch";
    HttpMethod["POST"] = "post";
    HttpMethod["PUT"] = "put";
    HttpMethod["TRACE"] = "trace";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
/**
 * Http Success Code
 * @enum
 */
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
/**
 * Http Error Code
 * @enum
 */
var HttpClientErrorCode;
(function (HttpClientErrorCode) {
    HttpClientErrorCode[HttpClientErrorCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpClientErrorCode[HttpClientErrorCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpClientErrorCode[HttpClientErrorCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    HttpClientErrorCode[HttpClientErrorCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpClientErrorCode[HttpClientErrorCode["NOT_FOUND"] = 404] = "NOT_FOUND";
})(HttpClientErrorCode = exports.HttpClientErrorCode || (exports.HttpClientErrorCode = {}));
/**
 * Http Server Error Codes
 * @enum
 */
var HttpServerErrorCode;
(function (HttpServerErrorCode) {
    HttpServerErrorCode[HttpServerErrorCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpServerErrorCode = exports.HttpServerErrorCode || (exports.HttpServerErrorCode = {}));
