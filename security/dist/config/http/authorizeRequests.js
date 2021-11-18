"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var requestMatcher_1 = __importDefault(require("./requestMatcher"));
var AuthorizeRequests = /** @class */ (function () {
    function AuthorizeRequests() {
        this.requestMatchers = [];
    }
    AuthorizeRequests.prototype.requestMatcher = function () {
        var regex = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            regex[_i] = arguments[_i];
        }
        var requestMatcher = new requestMatcher_1.default(this, regex.map(function (r) { return r.replace(/\*\*/g, "(.*)"); }));
        this.requestMatchers.push(requestMatcher);
        return requestMatcher;
    };
    AuthorizeRequests.prototype.anyRequest = function () {
        var requestMatcher = new requestMatcher_1.default(this, ["/(.*)"]);
        this.requestMatchers.push(requestMatcher);
        return requestMatcher;
    };
    AuthorizeRequests.prototype.matchers = function () {
        return this.requestMatchers;
    };
    return AuthorizeRequests;
}());
exports.default = AuthorizeRequests;
