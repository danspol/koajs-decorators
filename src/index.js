"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const lodash_1 = require("lodash");
const meta_1 = require("./meta");
const debug_1 = require("./debug");
const decorators_1 = require("./decorators");
const handlerFactory = (targetFunction, targetParams) => {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        const args = targetParams ? targetParams.map(({ sourceArgument, argumentName }) => {
            if (sourceArgument === decorators_1.SourceArgument.Next) {
                return next;
            }
            else if (sourceArgument === decorators_1.SourceArgument.Context) {
                return ctx;
            }
            else {
                return argumentName ?
                    ctx[sourceArgument][argumentName] :
                    ctx[sourceArgument];
            }
        }) : [ctx, next];
        yield targetFunction(...args);
    });
};
exports.UseDecorator = (target, debug = false) => {
    const instanceClass = new target();
    const metaDescription = meta_1.getMetaControllerMethod(instanceClass);
    const router = new Router();
    const Logger = debug_1.decoratorLogs(target.name, debug);
    for (let { route, controller, params, middleware } of metaDescription) {
        Logger.log({ route, controller, params, middleware });
        if (controller) {
            router.prefix(controller.prefix);
        }
        if (middleware) {
            const middlewareKeys = lodash_1.keys(middleware);
            const listMiddleware = lodash_1.map(middlewareKeys, (key) => {
                const middlewareFn = middleware[key];
                const newParams = params ? params[key] : [];
                return handlerFactory(middlewareFn, newParams);
            });
            router.use(...listMiddleware);
        }
        if (route) {
            const { method, target, path, methodName } = route;
            const newParams = params[methodName];
            router[method](path, handlerFactory(target, newParams));
        }
    }
    Logger.show();
    return router;
};
//# sourceMappingURL=index.js.map