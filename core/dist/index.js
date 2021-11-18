"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusMessage = exports.HttpClientErrorCode = exports.HttpServerErrorCode = exports.HttpSuccessCode = exports.HttpMethod = exports.ArgumentType = void 0;
var enum_1 = require("./util/enum");
Object.defineProperty(exports, "ArgumentType", { enumerable: true, get: function () { return enum_1.ArgumentType; } });
Object.defineProperty(exports, "HttpMethod", { enumerable: true, get: function () { return enum_1.HttpMethod; } });
Object.defineProperty(exports, "HttpSuccessCode", { enumerable: true, get: function () { return enum_1.HttpSuccessCode; } });
Object.defineProperty(exports, "HttpServerErrorCode", { enumerable: true, get: function () { return enum_1.HttpServerErrorCode; } });
Object.defineProperty(exports, "HttpClientErrorCode", { enumerable: true, get: function () { return enum_1.HttpClientErrorCode; } });
var type_1 = require("./util/type");
Object.defineProperty(exports, "HttpStatusMessage", { enumerable: true, get: function () { return type_1.HttpStatusMessage; } });
