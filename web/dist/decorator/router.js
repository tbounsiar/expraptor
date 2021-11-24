"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/**
 *
 * @param {@link RouterOption} router options
 * @constructor
 */
function router(option) {
    return function (target) {
        if (!target.prototype._router$) {
            target.prototype._router$ = {};
        }
        target.prototype._router$.path = option.path || "";
        target.prototype._router$.middlewares = option.middlewares;
    };
}
exports.router = router;
