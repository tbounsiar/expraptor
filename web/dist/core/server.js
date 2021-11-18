"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var configuration_1 = __importDefault(require("./configuration"));
/**
 * Class to allow deploying of server
 */
var Server = /** @class */ (function () {
    /**
     * Create instance of server
     * @param port Listening port
     */
    function Server(port) {
        this.port = port;
        this.routes = [];
        this.application = (0, express_1.default)();
        this.configurator = configuration_1.default.instance(this.application);
    }
    /**
     * Register a decorated Router class
     * @param router the decorated Router class or its instance
     */
    Server.prototype.register = function (router) {
        if (this.routes.indexOf(router) === -1) {
            this.routes.push(router);
        }
    };
    /**
     * Set template view engine
     * @param engine the view engine, ex: ejs, pug
     * @param path the views dir path
     */
    Server.prototype.setViewEngine = function (engine, path) {
        this.application.set("view engine", "ejs");
        this.application.set("views", path);
    };
    /**
     * Enable security using @expraptor/security
     * @param configurator instance of SecurityConfiguratorImpl class that implement @expraptor/security.SecurityConfigurator
     */
    Server.prototype.enableSecurity = function (configurator) {
        var security = require("@expraptor/security");
        if (!security) {
            throw new Error("Please install @expraptor/security 'npm i -S @expraptor/security'");
        }
        if (!configurator.http || !(configurator.http instanceof Function) || !configurator.auth || !(configurator.auth instanceof Function)) {
            throw new Error("enableSecurity(configurator) configurator should be implementation of security.SecurityConfigurator");
        }
        var securityConfiguration = security(this.application);
        configurator.http(securityConfiguration.httpSecurity());
        configurator.auth(securityConfiguration.buildAuth());
        this.configurator.setSecurityConfiguration(securityConfiguration);
    };
    /**
     * Add middleware to app, its like app.use(middleware)
     * @param middleware
     */
    Server.prototype.use = function (middleware) {
        this.application.use(middleware);
    };
    /**
     * Start to deploy the server
     */
    Server.prototype.start = function () {
        var _this = this;
        this.configurator.enableSecurity();
        this.routes.forEach(function (route) { return _this.configurator.register(route); });
        this.application.listen(this.port, function () {
            console.log("server is listening on http://localhost:" + _this.port);
        });
    };
    return Server;
}());
module.exports = Server;
