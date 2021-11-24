"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbiddenTemplate = exports.middlewareTemplate = exports.authorizedTemplate = exports.loginTemplate = void 0;
var authenticateType_1 = require("../config/auth/iface/authenticateType");
function loginTemplate(loginUrl) {
    return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Title</title>\n</head>\n<body>\n<form action=\"".concat(loginUrl, "\" method=\"post\">\n    <div>\n        <label for=\"login\">Login:</label>\n        <input id=\"login\" type=\"text\" name=\"login\" value=\"bob\">\n    </div>\n    <div>\n        <label for=\"password\">Password:</label>\n        <input id=\"password\" type=\"password\" name=\"password\" value=\"secret\">\n    </div>\n    <div><input type=\"submit\" value=\"Login\"></div>\n</form>\n</body>\n</html>");
}
exports.loginTemplate = loginTemplate;
function authorizedTemplate(condition) {
    return "\n        if(!(".concat(condition, ")){\n            errorHandling.forbidden(request, response);\n            return;\n        }");
}
exports.authorizedTemplate = authorizedTemplate;
function middlewareTemplate(configurator, authorized, type) {
    var error = "";
    switch (type) {
        case authenticateType_1.AuthenticateType.BASIC:
        case authenticateType_1.AuthenticateType.DIGEST:
        case authenticateType_1.AuthenticateType.BEARER:
            error = "\n        const [key, value] = authenticationProvider.getAskHeader(error);\n        response.set(key, value);";
            break;
        default:
            break;
    }
    var notAuthenticated = "errorHandling.unauthorized(request, response)";
    if (configurator.buildAuth().isRedirect()) {
        notAuthenticated = "response.redirect(\"".concat(configurator.buildAuth().formLogin().loginPage(), "?from=\" + request.originalUrl)");
    }
    return "(request, response, next) => {\n    const errorHandling = authenticationBuilder.errorHandling();\n    const authenticationProvider = authenticationBuilder.authenticationProvider();\n    try {\n        const authentication = authenticationProvider.getAuthentication(request);\n        if (!authentication.isAuthenticated()) {\n            ".concat(notAuthenticated, ";\n            return;\n        }").concat(authorized, "\n    } catch (error) {").concat(error, "\n        response.status(401).send(error.message);\n        error.stack;\n        return;\n    }\n    next();\n}");
}
exports.middlewareTemplate = middlewareTemplate;
exports.forbiddenTemplate = "(request, response) => {\n    const errorHandling = authenticationBuilder.errorHandling();\n    errorHandling.forbidden(request, response);\n}";
