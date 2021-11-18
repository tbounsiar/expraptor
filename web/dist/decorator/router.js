"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
/**
 *
 * @param {@link RouterOption} router options
 * @constructor
 */
function Router(option) {
    return function (target) {
        if (!target.prototype._router$) {
            target.prototype._router$ = {};
        }
        target.prototype._router$.path = option.path || "";
        target.prototype._router$.middlewares = option.middlewares;
    };
}
exports.Router = Router;
