"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var router_1 = require("./decorator/router");
var route_1 = require("./decorator/route");
var argument_1 = require("./decorator/argument");
var view_1 = __importDefault(require("./model/view"));
var core_1 = require("./core");
function web() {
}
web.Router = router_1.router;
web.ROUTE = route_1.route;
web.DELETE = route_1.del;
web.GET = route_1.get;
web.HEAD = route_1.head;
web.OPTIONS = route_1.options;
web.PATCH = route_1.patch;
web.POST = route_1.post;
web.PUT = route_1.put;
web.TRACE = route_1.trace;
web.RequestBody = argument_1.RequestBody;
web.Request = argument_1.Request;
web.BodyParam = argument_1.BodyParam;
web.QueryParam = argument_1.QueryParam;
web.Param = argument_1.Param;
web.Path = argument_1.Path;
web.Response = argument_1.Response;
web.Header = argument_1.Header;
web.View = view_1.default;
web.Server = core_1.Server;
module.exports = web;
