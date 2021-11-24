"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerTemplate = void 0;
function handlerTemplate(call, headers, status, format) {
    return "(request, response) => {\n    try {\n        ".concat(call, "\n        if (ret instanceof Promise) {\n            ret.then(result => {").concat(headers, "\n                response").concat(status, ".").concat(format, "(result);\n            }, reason => {\n                response.status(500).").concat(format, "(reason);\n            });\n        } else if(ret instanceof View) {").concat(headers, "\n            response").concat(status, ".render(ret.name, ret.options, ret.callback);\n        } else {").concat(headers, "\n            response").concat(status, ".").concat(format, "(ret);\n        }\n    } catch (e) {\n        response.status(500).").concat(format, "(e);\n    }\n}");
}
exports.handlerTemplate = handlerTemplate;
