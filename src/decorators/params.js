"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("../meta");
var SourceArgument;
(function (SourceArgument) {
    SourceArgument["Body"] = "body";
    SourceArgument["Params"] = "params";
    SourceArgument["Query"] = "query";
    SourceArgument["State"] = "state";
    SourceArgument["Request"] = "req";
    SourceArgument["Response"] = "res";
    SourceArgument["Next"] = "next";
    SourceArgument["Context"] = "ctx";
})(SourceArgument = exports.SourceArgument || (exports.SourceArgument = {}));
function decorateParams(sourceArgument) {
    return function (argumentName) {
        return function (target, methodName, index) {
            const targetMethod = target[methodName];
            meta_1.updateMetaParams(targetMethod, methodName, index, { sourceArgument, argumentName });
        };
    };
}
exports.Params = decorateParams(SourceArgument.Params);
exports.Body = decorateParams(SourceArgument.Body);
exports.Query = decorateParams(SourceArgument.Query);
exports.State = decorateParams(SourceArgument.State);
exports.Context = decorateParams(SourceArgument.Context);
exports.Request = decorateParams(SourceArgument.Request);
exports.Response = decorateParams(SourceArgument.Response);
exports.Next = decorateParams(SourceArgument.Next);
//# sourceMappingURL=params.js.map