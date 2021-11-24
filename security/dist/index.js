"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var config = __importStar(require("./config"));
var decorator_1 = require("./decorator");
var auth_1 = require("./config/auth");
function security(application, change) {
    if (change === void 0) { change = true; }
    return new config.Configurator(application, change);
}
security.Configurator = config.Configurator;
security.PreAuthorize = decorator_1.PreAuthorize;
security.auth = { RequestAuthenticationImpl: auth_1.RequestAuthenticationImpl };
security.config = config;
module.exports = security;
