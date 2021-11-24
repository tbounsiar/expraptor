"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    function Server(port, host, callback) {
        this.port = port;
        this.host = host;
        this.callback = callback;
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
    Server.prototype.enableSecurity = function (configurator, security) {
        if (!security) {
            try {
                security = require("@expraptor/security");
            }
            catch (e) {
                throw new Error("Please install @expraptor/security 'npm i -S @expraptor/security'");
            }
        }
        if (!configurator || !configurator.http || !(configurator.http instanceof Function) || !configurator.auth || !(configurator.auth instanceof Function)) {
            throw new Error("enableSecurity(configurator) configurator should be implementation of security.SecurityConfigurator");
        }
        var securityConfiguration = security(this.application, false);
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
        var _a;
        var _this = this;
        this.routes.forEach(function (route) { return _this.configurator.register(route); });
        var args = [];
        if (this.host) {
            args.push(this.host);
        }
        if (this.callback) {
            args.push(this.callback);
        }
        return (_a = this.application).listen.apply(_a, __spreadArray([this.port], args, false));
    };
    return Server;
}());
exports.default = Server;
