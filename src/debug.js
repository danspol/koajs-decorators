"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.decoratorLogs = (name, log = false) => {
    let data = [];
    return {
        log: ({ route, controller, params, middleware }) => {
            let groupMiddleware = [];
            let groupRoute = {};
            if (controller) {
                data.push(controller);
            }
            if (middleware) {
                const middlewareKeys = lodash_1.keys(middleware);
                const listMiddleware = lodash_1.map(middlewareKeys, (key) => {
                    const methodName = middleware[key].name;
                    const newParams = params ? params[key] : [];
                    return { methodName: methodName, params: exports.debugArguments(newParams) };
                });
                groupMiddleware.push(...listMiddleware);
            }
            if (route) {
                const { method, target, path, methodName } = route;
                const newParams = params[methodName];
                groupRoute = { method, path, methodName, params: exports.debugArguments(newParams) };
            }
            if (route) {
                groupMiddleware = groupMiddleware.map((item) => {
                    return Object.assign({}, item, { routeMethod: groupRoute.method });
                });
                data.push(...groupMiddleware);
                data.push(groupRoute);
            }
            else {
                data.push(...groupMiddleware);
            }
        },
        show: () => {
            if (log) {
                console.log(name);
                console.table(data);
                data = [];
            }
        }
    };
};
exports.debugArguments = (newParams) => {
    return newParams && newParams.map((arg) => {
        return arg.argumentName ? `${arg.argumentName}: ${arg.sourceArgument}` : arg.sourceArgument;
    }).toString() || `ctx, next`;
};
//# sourceMappingURL=debug.js.map