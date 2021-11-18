"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = require("../../core/template");
var FormLogin = /** @class */ (function () {
    function FormLogin(authenticationBuilder) {
        this.authenticationBuilder = authenticationBuilder;
    }
    FormLogin.prototype.loginPage = function (loginPage) {
        if (loginPage) {
            this._loginPage = loginPage;
            return this;
        }
        return this._loginPage;
    };
    FormLogin.prototype.loginUrl = function (loginUrl) {
        if (loginUrl) {
            this._loginUrl = loginUrl;
            return this;
        }
        return this._loginUrl;
    };
    FormLogin.prototype.logoutUrl = function (logoutUrl) {
        if (logoutUrl) {
            this._logoutUrl = logoutUrl;
            return this;
        }
        return this._logoutUrl;
    };
    FormLogin.prototype.enable = function (application) {
        var _this = this;
        // Use default login page
        if (!this._loginPage) {
            var authenticationProvider_1 = this.authenticationBuilder.authenticationProvider();
            // @ts-ignore
            application.get(FormLogin.DEFAULT_LOGIN_PAGE, function (request, response) {
                // @ts-ignore
                var requestAuthentication = authenticationProvider_1.getAuthentication(request);
                if (requestAuthentication.isAuthenticated()) {
                    if (request.query.from) {
                        response.redirect(request.query.from);
                    }
                    else {
                        response.redirect("/");
                    }
                }
                else {
                    var loginUrl = _this._loginUrl || FormLogin.DEFAULT_LOGIN_URL;
                    response.send((0, template_1.loginTemplate)(loginUrl + "?from=" + request.query.from));
                }
            });
        }
        // Use default login url
        if (!this._loginUrl) {
            var authenticator_1 = this.authenticationBuilder.authenticator();
            var authenticationProvider_2 = this.authenticationBuilder.authenticationProvider();
            // @ts-ignore
            application.post(FormLogin.DEFAULT_LOGIN_URL, function (request, response) {
                if (!request.body) {
                    throw new Error("Be sure to set url encoded : app.use(express.urlencoded());");
                }
                var authentication = authenticator_1.authenticate(request.body.login, request.body.password);
                authenticationProvider_2.setAuthentication(request, authentication);
                var url = request.query.from;
                response.redirect(url);
            });
        }
        // Use default login url
        if (!this._logoutUrl) {
            var authenticationProvider_3 = this.authenticationBuilder.authenticationProvider();
            // @ts-ignore
            application.post(FormLogin.DEFAULT_LOGOUT_URL, function (request, response) {
                authenticationProvider_3.setAuthentication(request, null);
                response.redirect("/");
            });
        }
    };
    FormLogin.prototype.and = function () {
        return this.authenticationBuilder;
    };
    FormLogin.DEFAULT_LOGIN_PAGE = "/login";
    FormLogin.DEFAULT_LOGIN_URL = "/auth/login";
    FormLogin.DEFAULT_LOGOUT_URL = "/auth/logout";
    return FormLogin;
}());
exports.default = FormLogin;
