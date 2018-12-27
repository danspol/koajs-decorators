"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.nameMetaController = '__koajs_decorators_controller__';
exports.nameMetaMiddleware = '__koajs_decorators_middleware__';
exports.nameMetaParams = '__koajs_decorators_params__';
exports.nameMetaRoute = '__koajs_decorators_route__';
const getAllMethods = (target) => {
    let propertyNames = [];
    let extendClassMethods = [];
    const propOf = Object.getPrototypeOf(target);
    if (target && propOf.constructor.name !== "Object") {
        propertyNames = Object.getOwnPropertyNames(propOf);
        if (propertyNames.length > 1) {
            extendClassMethods = getAllMethods(Object.getPrototypeOf(target));
        }
    }
    return [...extendClassMethods, ...propertyNames];
};
function getMetaRoute(target) {
    if (!target[exports.nameMetaRoute]) {
        target[exports.nameMetaRoute] = {
            path: '',
            methodName: '',
            method: null,
            target: null
        };
    }
    return target[exports.nameMetaRoute];
}
exports.getMetaRoute = getMetaRoute;
function updateMetaRoute(route, path, method, target, methodName) {
    route.path = path;
    route.method = method;
    route.methodName = methodName;
    route.target = target;
}
exports.updateMetaRoute = updateMetaRoute;
function getMetaMiddleware(target) {
    if (!target[exports.nameMetaMiddleware]) {
        target[exports.nameMetaMiddleware] = {};
    }
    return target[exports.nameMetaMiddleware];
}
exports.getMetaMiddleware = getMetaMiddleware;
function updateMetaMiddleware(target, values) {
    if (!target[exports.nameMetaMiddleware]) {
        target[exports.nameMetaMiddleware] = {};
    }
    target[exports.nameMetaMiddleware] = values;
}
exports.updateMetaMiddleware = updateMetaMiddleware;
function getMetaParams(target) {
    if (!target[exports.nameMetaParams]) {
        target[exports.nameMetaParams] = {};
    }
    return target[exports.nameMetaParams];
}
exports.getMetaParams = getMetaParams;
function updateMetaParams(targetMethod, methodName, index, values) {
    const meta = getMetaParams(targetMethod);
    if (!meta[methodName]) {
        meta[methodName] = [];
    }
    meta[methodName][index] = values;
}
exports.updateMetaParams = updateMetaParams;
function getMetaController(target) {
    if (!target[exports.nameMetaController]) {
        target[exports.nameMetaController] = {};
    }
    return target[exports.nameMetaController];
}
exports.getMetaController = getMetaController;
function getMetaControllerMethod(target) {
    const propertyNames = lodash_1.uniq(getAllMethods(target));
    return lodash_1.map(propertyNames, (nameMethod) => {
        const targetMethod = target[nameMethod];
        let metaDescription = {};
        if (targetMethod.hasOwnProperty(exports.nameMetaController)) {
            const controller = getMetaController(targetMethod);
            metaDescription = Object.assign({}, metaDescription, { controller });
        }
        if (targetMethod.hasOwnProperty(exports.nameMetaParams)) {
            const params = getMetaParams(targetMethod);
            metaDescription = Object.assign({}, metaDescription, { params });
        }
        if (targetMethod.hasOwnProperty(exports.nameMetaRoute)) {
            const route = getMetaRoute(targetMethod);
            metaDescription = Object.assign({}, metaDescription, { route });
        }
        if (targetMethod.hasOwnProperty(exports.nameMetaMiddleware)) {
            const middleware = getMetaMiddleware(targetMethod);
            metaDescription = Object.assign({}, metaDescription, { middleware });
        }
        return metaDescription;
    });
}
exports.getMetaControllerMethod = getMetaControllerMethod;
//# sourceMappingURL=meta.js.map