"use strict";
/**
 * Decorator for specifying a method access-control expression which will be evaluated to decide whether a method invocation is allowed or not.
 * @param {string} authorization: The method access-control expression
 * @constructor
 */
function PreAuthorize(authorization) {
    return function (target, propertyKey, _) {
        var store = target.prototype || target.constructor.prototype;
        if (!store._routes$) {
            store._routes$ = {};
        }
        if (!store._routes$[propertyKey]) {
            store._routes$[propertyKey] = {};
        }
        store._routes$[propertyKey].authorization = authorization;
    };
}
module.exports = PreAuthorize;
