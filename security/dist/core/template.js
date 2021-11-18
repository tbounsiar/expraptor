"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbiddenTemplate = exports.middlewareTemplate = exports.authorizedTemplate = exports.loginTemplate = void 0;
var formLogin_1 = __importDefault(require("../config/auth/formLogin"));
var authenticateType_1 = require("../config/auth/iface/authenticateType");
function loginTemplate(loginUrl) {
    return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Title</title>\n</head>\n<body>\n<form action=\"" + loginUrl + "\" method=\"post\">\n    <div>\n        <label for=\"login\">Login:</label>\n        <input id=\"login\" type=\"text\" name=\"login\" value=\"bob\">\n    </div>\n    <div>\n        <label for=\"password\">Password:</label>\n        <input id=\"password\" type=\"password\" name=\"password\" value=\"secret\">\n    </div>\n    <div><input type=\"submit\" value=\"Login\"></div>\n</form>\n</body>\n</html>";
}
exports.loginTemplate = loginTemplate;
function authorizedTemplate(condition) {
    return "if(!(" + condition + ")){\n        errorHandling.forbidden(response);\n        return;\n    }";
}
exports.authorizedTemplate = authorizedTemplate;
function middlewareTemplate(configurator, authorized, type) {
    var error = "";
    switch (type) {
        case authenticateType_1.AuthenticateType.BASIC:
        case authenticateType_1.AuthenticateType.DIGEST:
            error = "const [key, value] = authenticationProvider.getAskHeader();\n        response.set(key, value);";
            break;
        case authenticateType_1.AuthenticateType.BEARER:
            error = "response.set('WWW-Authenticate', 'Bearer realm=\"\", charset=\"utf-8\"');";
            break;
        default:
            break;
    }
    return "(request, response, next) => {\n    const errorHandling = authenticationBuilder.errorHandling();\n    const authenticationProvider = authenticationBuilder.authenticationProvider();\n    try {\n        const authentication = authenticationProvider.getAuthentication(request);\n        if (!authentication.isAuthenticated()) {\n            " + (configurator.buildAuth().isRedirect() ?
        "response.redirect(\"" + (configurator.buildAuth().formLogin().loginPage() || formLogin_1.default.DEFAULT_LOGIN_PAGE) + "?from=\" + request.originalUrl)" :
        "errorHandling.unauthorized(response);") + ";\n            return;\n        }\n    } catch (e) {\n        " + error + "\n        response.status(401).send(e.message);\n        return;\n    }\n    " + authorized + "\n    next();\n}";
}
exports.middlewareTemplate = middlewareTemplate;
exports.forbiddenTemplate = "(request, response, next) => {\n    const errorHandling = authenticationBuilder.errorHandling();\n    errorHandling.unauthorized(response);\n}";
