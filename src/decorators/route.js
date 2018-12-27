"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("../meta");
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["PUT"] = "put";
    Methods["DELETE"] = "del";
    Methods["All"] = "all";
})(Methods = exports.Methods || (exports.Methods = {}));
function decorateRoute(method) {
    return function (path) {
        return function (target, methodName, descriptor) {
            const targetMethod = target[methodName];
            const route = meta_1.getMetaRoute(targetMethod);
            meta_1.updateMetaRoute(route, path, method, descriptor.value, methodName);
        };
    };
}
exports.Get = decorateRoute(Methods.GET);
exports.Post = decorateRoute(Methods.POST);
exports.Put = decorateRoute(Methods.PUT);
exports.Delete = decorateRoute(Methods.DELETE);
exports.All = decorateRoute(Methods.All);
//# sourceMappingURL=route.js.map