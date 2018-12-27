"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("../meta");
function decorateMiddleware() {
    return function (...middlewares) {
        return function (target, methodName) {
            const targetMethod = target[methodName];
            let newValues = {};
            if (middlewares && middlewares.length > 0) {
                newValues = middlewares.reduce((result, middleware) => {
                    return middleware ? Object.assign({}, result, { [middleware.name]: middleware }) : result;
                }, {});
            }
            else {
                newValues = { [methodName]: targetMethod };
            }
            meta_1.updateMetaMiddleware(targetMethod, newValues);
        };
    };
}
exports.Middleware = decorateMiddleware();
//# sourceMappingURL=middleware.js.map