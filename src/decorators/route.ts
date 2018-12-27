import {getMetaRoute, updateMetaRoute} from '../meta';

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'del',
  All = "all",
}

function decorateRoute(method: Methods) {

  return function (path: string) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
      const targetMethod = target[methodName];
      const route = getMetaRoute(targetMethod);

      updateMetaRoute(route, path, method, descriptor.value, methodName);
    }
  }
}

export const Get = decorateRoute(Methods.GET);
export const Post = decorateRoute(Methods.POST);
export const Put = decorateRoute(Methods.PUT);
export const Delete = decorateRoute(Methods.DELETE);
export const All = decorateRoute(Methods.All);