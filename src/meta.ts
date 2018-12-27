import {map, uniq} from 'lodash';
import {Methods} from "./decorators";

export const nameMetaController = '__koajs_decorators_controller__';
export const nameMetaMiddleware = '__koajs_decorators_middleware__';
export const nameMetaParams = '__koajs_decorators_params__';
export const nameMetaRoute = '__koajs_decorators_route__';

const getAllMethods = (target: Function): string[] => {
  let propertyNames: string[] = [];
  let extendClassMethods: string[] = [];
  const propOf = Object.getPrototypeOf(target);

  if (target && propOf.constructor.name !== "Object") {
    propertyNames = Object.getOwnPropertyNames(propOf);

    if (propertyNames.length > 1) {
      extendClassMethods = getAllMethods(Object.getPrototypeOf(target));
    }
  }

  return [...extendClassMethods, ...propertyNames]
};

export type FunArgs = {
  propName: string,
  propSource: string
}

export type MetaController = {
  prefix: string;
}

export type MetaRoute = {
  path: string,
  method: Methods,
  methodName: string,
  target: Function,
}

export type MetaMiddleware = {
  [key: string]: Function
}

export type MetaParams = {
  [key: string]: FunArgs[];
}

export type MetaControllerMethods = {
  controller?: MetaController,
  middleware?: MetaMiddleware,
  params?: MetaParams,
  route?: MetaRoute
}

export function getMetaRoute(target: any): MetaRoute {

  if (!target[nameMetaRoute]) {

    target[nameMetaRoute] = {
      path: '',
      methodName: '',
      method: null,
      target: null
    }
  }

  return target[nameMetaRoute];
}

export function updateMetaRoute(route: MetaRoute, path: string, method: Methods, target: Function, methodName: string) {
  route.path = path;
  route.method = method;
  route.methodName = methodName;
  route.target = target;
}

export function getMetaMiddleware(target: any): MetaMiddleware {

  if (!target[nameMetaMiddleware]) {

    target[nameMetaMiddleware] = {};
  }

  return target[nameMetaMiddleware];
}

export function updateMetaMiddleware(target: any, values: { [key: string]: Function }) {
  if (!target[nameMetaMiddleware]) {

    target[nameMetaMiddleware] = {};
  }

  target[nameMetaMiddleware] = values;
}

export function getMetaParams(target: any): MetaParams {

  if (!target[nameMetaParams]) {

    target[nameMetaParams] = {}
  }

  return target[nameMetaParams];
}

export function updateMetaParams(targetMethod: any, methodName: string, index: number, values: FunArgs) {
  const meta = getMetaParams(targetMethod);

  if (!meta[methodName]) {
    meta[methodName] = [];
  }

  meta[methodName][index] = values;
}

export function getMetaController(target: any): MetaController {
  if (!target[nameMetaController]) {

    target[nameMetaController] = {}
  }

  return target[nameMetaController];
}

export function getMetaControllerMethod(target: any): MetaControllerMethods[] {
  const propertyNames = uniq(getAllMethods(target));

  return map(propertyNames, (nameMethod) => {
    const targetMethod = target[nameMethod];
    let metaDescription = {};
    if (targetMethod.hasOwnProperty(nameMetaController)) {
      const controller = getMetaController(targetMethod);
      metaDescription = {...metaDescription, controller};
    }

    if (targetMethod.hasOwnProperty(nameMetaParams)) {
      const params = getMetaParams(targetMethod);
      metaDescription = {...metaDescription, params};
    }

    if (targetMethod.hasOwnProperty(nameMetaRoute)) {
      const route = getMetaRoute(targetMethod);
      metaDescription = {...metaDescription, route};
    }

    if (targetMethod.hasOwnProperty(nameMetaMiddleware)) {
      const middleware = getMetaMiddleware(targetMethod);
      metaDescription = {...metaDescription, middleware};
    }

    return metaDescription;
  }) as MetaControllerMethods[];
}
