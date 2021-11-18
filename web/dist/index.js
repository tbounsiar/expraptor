"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var router_1 = require("./decorator/router");
var route_1 = require("./decorator/route");
var argument_1 = require("./decorator/argument");
var view_1 = __importDefault(require("./model/view"));
var server_1 = __importDefault(require("./core/server"));
function web() {
}
web.Router = router_1.Router;
web.Route = route_1.Route;
web.GET = route_1.GET;
web.POST = route_1.POST;
web.PUT = route_1.PUT;
web.DELETE = route_1.DELETE;
web.HEAD = route_1.HEAD;
web.OPTIONS = route_1.OPTIONS;
web.PATCH = route_1.PATCH;
web.TRACE = route_1.TRACE;
web.CONNECT = route_1.CONNECT;
web.RequestBody = argument_1.RequestBody;
web.Request = argument_1.Request;
web.BodyParam = argument_1.BodyParam;
web.QueryParam = argument_1.QueryParam;
web.Param = argument_1.Param;
web.Path = argument_1.Path;
web.Next = argument_1.Next;
web.Response = argument_1.Response;
web.Header = argument_1.Header;
web.View = view_1.default;
web.Server = server_1.default;
module.exports = web;
