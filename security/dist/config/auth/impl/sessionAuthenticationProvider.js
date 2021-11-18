"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var requestAuthenticationImpl_1 = __importDefault(require("./requestAuthenticationImpl"));
var SessionAuthenticationProvider = /** @class */ (function () {
    function SessionAuthenticationProvider() {
    }
    SessionAuthenticationProvider.prototype.getAuthentication = function (request) {
        // @ts-ignore
        if (!request.session) {
            throw new Error("Be sure to set express-session. app.use(session({secret: \"secret\"}));");
        }
        // @ts-ignore
        var authentication = request.session.authentication;
        return new requestAuthenticationImpl_1.default(authentication);
    };
    SessionAuthenticationProvider.prototype.setAuthentication = function (request, authentication) {
        // @ts-ignore
        if (!request.session) {
            throw new Error("Be sure to set express-session. app.use(session({secret: \"secret\"}));");
        }
        // @ts-ignore
        request.session.authentication = authentication;
    };
    return SessionAuthenticationProvider;
}());
exports.default = SessionAuthenticationProvider;
