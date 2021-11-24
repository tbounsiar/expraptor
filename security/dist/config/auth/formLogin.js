"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = require("../../core/template");
var FormLogin = /** @class */ (function () {
    function FormLogin(authenticationBuilder) {
        this.authenticationBuilder = authenticationBuilder;
    }
    FormLogin.prototype.loginPage = function (loginPage) {
        if (loginPage === undefined) {
            return this._loginPage || FormLogin.DEFAULT_LOGIN_PAGE;
        }
        this._loginPage = loginPage;
        return this;
    };
    FormLogin.prototype.loginUrl = function (loginUrl) {
        if (loginUrl === undefined) {
            return this._loginUrl;
        }
        this._loginUrl = loginUrl;
        return this;
    };
    FormLogin.prototype.logoutUrl = function (logoutUrl) {
        if (logoutUrl === undefined) {
            return this._logoutUrl;
        }
        this._logoutUrl = logoutUrl;
        return this;
    };
    FormLogin.prototype.redirectUrl = function (redirectUrl) {
        this._redirectUrl = redirectUrl;
        return this;
    };
    FormLogin.prototype.and = function () {
        return this.authenticationBuilder;
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
                    var redirect = "/";
                    if (_this._redirectUrl) {
                        redirect = _this._redirectUrl;
                    }
                    else if (request.query.from) {
                        redirect = request.query.from;
                    }
                    response.redirect(redirect);
                }
                else {
                    var loginUrl = _this._loginUrl || FormLogin.DEFAULT_LOGIN_URL;
                    if (!_this._redirectUrl && request.query.from) {
                        loginUrl += "?from=" + request.query.from;
                    }
                    response.send((0, template_1.loginTemplate)(loginUrl));
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
                var redirect = "/";
                if (_this._redirectUrl) {
                    redirect = _this._redirectUrl;
                }
                else if (request.query.from) {
                    redirect = request.query.from;
                }
                response.redirect(redirect);
            });
        }
        // Use default login url
        if (!this._logoutUrl) {
            var authenticationProvider_3 = this.authenticationBuilder.authenticationProvider();
            var redirect_1 = "/";
            if (this._redirectUrl) {
                redirect_1 = this._redirectUrl;
            }
            // @ts-ignore
            application.post(FormLogin.DEFAULT_LOGOUT_URL, function (request, response) {
                authenticationProvider_3.setAuthentication(request, null);
                response.redirect(redirect_1);
            });
        }
    };
    FormLogin.DEFAULT_LOGIN_PAGE = "/login";
    FormLogin.DEFAULT_LOGIN_URL = "/auth/login";
    FormLogin.DEFAULT_LOGOUT_URL = "/auth/logout";
    return FormLogin;
}());
exports.default = FormLogin;
