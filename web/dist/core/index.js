"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHandler = void 0;
var core_1 = require("@expraptor/core");
var util_1 = require("./util");
var handlerTemplate = "(request, response, next) => {\n    $process;\n}";
function setHandler(option, target, propertyKey, descriptor) {
    var store = target.prototype || target.constructor.prototype;
    if (!store._routes$) {
        store._routes$ = {};
    }
    if (!store._routes$[propertyKey]) {
        store._routes$[propertyKey] = {};
    }
    store._routes$[propertyKey].method = option.method || core_1.HttpMethod.ALL;
    store._routes$[propertyKey].path = option.path || "";
    store._routes$[propertyKey].middlewares = option.middlewares;
    var names = (0, util_1.getParamNames)(descriptor.value);
    if (names.length > 0 && (!store._routes$[propertyKey].arguments || names.length !== store._routes$[propertyKey].arguments.length)) {
        if (store._routes$[propertyKey].arguments) {
            store._routes$[propertyKey].arguments.forEach(function (argument) {
                var index = names.indexOf(argument.key);
                if (index !== -1) {
                    names.splice(index, 1);
                }
            });
        }
        throw Error("Non decorated for route " + descriptor.value.name + " function args [" + names.join(", ") + "];");
    }
    var args = [];
    if (store._routes$[propertyKey].arguments) {
        store._routes$[propertyKey].arguments.forEach(function (argument) {
            switch (argument.type) {
                case core_1.ArgumentType.PATH:
                    args[argument.index] = "request.params[\"" + argument.key + "\"]";
                    break;
                case core_1.ArgumentType.QUERY:
                case core_1.ArgumentType.BODY:
                    args[argument.index] = "request[\"" + argument.type + "\"][\"" + argument.key + "\"]";
                    break;
                case core_1.ArgumentType.PARAM:
                    var key = store._routes$[propertyKey].method === core_1.HttpMethod.POST ? "body" : "query";
                    args[argument.index] = "request[\"" + key + "\"][\"" + argument.key + "\"]";
                    break;
                case core_1.ArgumentType.HEADER:
                    args[argument.index] = "request.get(\"" + argument.key + "\")";
                    break;
                case core_1.ArgumentType.REQUEST_BODY:
                    args[argument.index] = "request.body";
                    break;
                case core_1.ArgumentType.REQUEST:
                    args[argument.index] = "request";
                    break;
                case core_1.ArgumentType.RESPONSE:
                    args[argument.index] = "response";
                    break;
                case core_1.ArgumentType.NEXT:
                    args[argument.index] = "next";
                    break;
                default:
                    throw Error("Unknown argument " + argument.key + " type");
                    break;
            }
        });
    }
    var call = "const ret = descriptor.value.call(this);";
    if (args.length > 0) {
        call = "const args = [];";
        args.forEach(function (value, index) {
            call += "\n        args[" + index + "] = " + value + ";";
        });
        call += "\n        const ret = descriptor.value.call(this, ...args);";
    }
    var status = option.status && option.status !== 200 ? ".status(" + option.status + ")" : "";
    var format = option.format || "send";
    var headersText = "";
    if (option.headers) {
        for (var key in option.headers) {
            var value = option.headers[key];
            headersText += "\n            response.set(\"" + key + "\", \"" + value + "\");";
        }
    }
    var processText = "try {\n        " + call + "\n        if (ret instanceof Promise) {\n            ret.then(result => {" + headersText + "\n                response" + status + "." + format + "(result);\n            }, reason => {\n                response.status(500)." + format + "(reason);\n            });\n        } else if(ret instanceof require(\"../model/view\")) {" + headersText + "\n            response" + status + ".render(ret.name, ret.options, ret.callback);\n        } else {" + headersText + "\n            response" + status + "." + format + "(ret);\n        }\n    } catch (e) {\n        response.status(500)." + format + "(e);\n    }";
    var handlerText = handlerTemplate.replace("$process;", processText);
    var handler = eval(handlerText);
    store._routes$[propertyKey].handler = handler;
}
exports.setHandler = setHandler;
