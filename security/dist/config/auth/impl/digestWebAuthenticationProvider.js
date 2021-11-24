"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_utils_1 = require("../../../core/crypto-utils");
var utils_1 = require("../../../core/utils");
var webAuthenticationProvider_1 = __importDefault(require("./webAuthenticationProvider"));
var CREDENTIALS_REGEXP = /^digest\s(.*)/i;
var PARAMS_SPLITER_REGEXP = /,(?=(?:[^"]|"[^"]*")*$)/;
var STRIP_QUOTES_WHITESPACE_REGEXP = /(\w+)=["]?([^"]*)["]?$/;
/**
 * Class for WWW-Authenticate Digest implementation
 */
var DigestWebAuthenticationProvider = /** @class */ (function (_super) {
    __extends(DigestWebAuthenticationProvider, _super);
    function DigestWebAuthenticationProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nonces = [];
        _this.opaques = [];
        _this._opaque = false;
        _this._stale = false;
        return _this;
    }
    /**
     * Set WWW-Authenticate Digest domain
     * @param {string} domain: domain value
     */
    DigestWebAuthenticationProvider.prototype.domain = function (domain) {
        this._domain = domain;
        return this;
    };
    /**
     * Activate WWW-Authenticate Digest opaque
     */
    DigestWebAuthenticationProvider.prototype.opaque = function () {
        this._opaque = true;
        return this;
    };
    /**
     * Activate WWW-Authenticate Digest stale
     */
    DigestWebAuthenticationProvider.prototype.stale = function () {
        this._stale = true;
        return this;
    };
    /**
     * Set WWW-Authenticate Digest algorithm
     * @param {Algorithm} algorithm: algorithm value
     */
    DigestWebAuthenticationProvider.prototype.algorithm = function (algorithm) {
        this._algorithm = algorithm;
        return this;
    };
    /**
     * Set WWW-Authenticate Digest qop
     * @param {QOP} algorithm: qop value
     */
    DigestWebAuthenticationProvider.prototype.qop = function (qop) {
        this._qop = qop;
        return this;
    };
    DigestWebAuthenticationProvider.prototype.parse = function (authorization, request) {
        // parse header
        var match = CREDENTIALS_REGEXP.exec(authorization);
        if (!match) {
            return undefined;
        }
        var params = match[1];
        // Split the parameters by comma.
        var tokens = params.split(PARAMS_SPLITER_REGEXP);
        var options = {};
        // Parse parameters.
        var i = 0;
        var len = tokens.length;
        while (i < len) {
            // Strip quotes and whitespace.
            var param = STRIP_QUOTES_WHITESPACE_REGEXP.exec(tokens[i]);
            if (param) {
                options[param[1]] = param[2];
            }
            ++i;
        }
        if (this.validateNonce(options)) {
            var password = (0, crypto_utils_1.md5)("".concat(request.method, ":").concat(options.uri));
            return {
                login: options.username,
                password: password,
                options: options
            };
        }
        return undefined;
    };
    DigestWebAuthenticationProvider.prototype.getAskHeaderValue = function () {
        var nonce = (0, crypto_utils_1.md5)((0, utils_1.generate)(10));
        this.nonces.push([nonce, Date.now(), 0]);
        var options = ["Digest realm=\"".concat(this._realm, "\"")];
        if (this._domain) {
            options.push("domain=\"".concat(this._domain, "\""));
        }
        options.push("nonce=\"".concat(nonce, "\""));
        if (this._opaque) {
            var opaque = (0, crypto_utils_1.md5)((0, utils_1.generate)(10));
            this.opaques.push([nonce, Date.now(), 0]);
            options.push("opaque=\"".concat(opaque, "\""));
        }
        options.push("stale=\"".concat(this._stale, "\""));
        if (this._algorithm) {
            options.push("algorithm=\"".concat(this._algorithm, "\""));
        }
        if (this._qop) {
            options.push("qop=\"".concat(this._qop, "\""));
        }
        return options.join(", ");
    };
    // Validate nonce.
    DigestWebAuthenticationProvider.prototype.validateNonce = function (options) {
        var found = false;
        // Nonces for removal.
        var noncesToRemove = [];
        // Current time.
        var now = Date.now();
        // Searching for not expired ones.
        this.nonces.forEach(function (serverNonce) {
            if (serverNonce[1] + 3600000 > now) {
                if (serverNonce[0] === options.nonce) {
                    if (options.qop) {
                        // Request counter is hexadecimal.
                        var ncNum = Number.parseInt(options.nc, 16);
                        if (ncNum > serverNonce[2]) {
                            found = true;
                            serverNonce[2] = ncNum;
                        }
                    }
                    else {
                        found = true;
                    }
                }
            }
            else {
                noncesToRemove.push(serverNonce);
            }
        });
        // Remove expired nonces.
        this.removeNonces(noncesToRemove);
        return found;
    };
    // Remove nonces.
    DigestWebAuthenticationProvider.prototype.removeNonces = function (noncesToRemove) {
        var _this = this;
        noncesToRemove.forEach(function (nonce) {
            var index = _this.nonces.indexOf(nonce);
            if (index !== -1) {
                _this.nonces.splice(index, 1);
            }
        });
    };
    return DigestWebAuthenticationProvider;
}(webAuthenticationProvider_1.default));
exports.default = DigestWebAuthenticationProvider;
