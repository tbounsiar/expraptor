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
/**
 * @private
 */
var Configurator = /** @class */ (function () {
    function Configurator(application) {
        this.application = application;
    }
    Configurator.instance = function (application) {
        return new Configurator(application);
    };
    Configurator.prototype.setSecurityConfiguration = function (securityConfiguration) {
        this.securityConfiguration = securityConfiguration;
    };
    Configurator.prototype.enableSecurity = function () {
        if (this.securityConfiguration) {
            this.securityConfiguration.enable(true);
        }
    };
    Configurator.prototype.register = function (route) {
        var router = express_1.default.Router();
        var store = route instanceof Function ? route.prototype : route;
        if (store._router$.middlewares && store._router$.middlewares.length > 0) {
            router.use.apply(router, store._router$.middlewares);
        }
        for (var key in store._routes$) {
            var r = store._routes$[key];
            if (this.securityConfiguration) {
                this.securityConfiguration.secure(r, store._router$.path);
            }
            if (r.middlewares && r.middlewares.length > 0) {
                // @ts-ignore
                router[r.method].apply(router, __spreadArray([/*"$SECURED$", */ r.path], __spreadArray(__spreadArray([], r.middlewares, true), [r.handler], false), false));
            }
            else {
                // @ts-ignore
                router[r.method](/*"$SECURED$", */ r.path, r.handler);
            }
        }
        this.application.use(store._router$.path, router);
        delete store._router$;
        delete store._routes$;
    };
    return Configurator;
}());
exports.default = Configurator;
