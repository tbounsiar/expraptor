"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authorizeRequests_1 = __importDefault(require("./authorizeRequests"));
var HttpSecurity = /** @class */ (function () {
    function HttpSecurity() {
        this.authorizeRequests = new authorizeRequests_1.default();
        this._cors = false;
    }
    HttpSecurity.prototype.authorize = function () {
        return this.authorizeRequests;
    };
    HttpSecurity.prototype.cors = function () {
        this._cors = true;
        return this;
    };
    HttpSecurity.prototype.enable = function (application) {
        if (this._cors) {
            var cors = require("cors");
            if (!cors) {
                throw new Error("cors not found, check that cors installed correctly [npm install cors]");
            }
            application.use(cors());
        }
    };
    return HttpSecurity;
}());
exports.default = HttpSecurity;
