"use strict";
/**
 * View class to use template engine
 */
var View = /** @class */ (function () {
    /**
     * @param _name {string} template view file name.
     * @param _callback {(err: Error, html: string) => void} rendering callback function.
     * @constructor
     */
    function View(_name, _callback) {
        this._name = _name;
        this._callback = _callback;
        this._options = {};
    }
    View.prototype.set = function (key, value) {
        this._options[key] = value;
    };
    Object.defineProperty(View.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(View.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(View.prototype, "callback", {
        get: function () {
            return this._callback;
        },
        enumerable: false,
        configurable: true
    });
    return View;
}());
module.exports = View;
