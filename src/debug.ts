import {keys, map} from "lodash";
import {FunArgs, MetaControllerMethods} from './meta';

type GroupRoute = {
  method: string;
  path: string;
  methodName: string;
  params: string;
}

export const decoratorLogs = (name: string, log = false) => {

  let data: any = [];

  return {
    log: ({route, controller, params, middleware}: MetaControllerMethods) => {

      let groupMiddleware = [];
      let groupRoute: GroupRoute;

      if (controller) {
        data.push(controller);
      }

      if (middleware) {
        const middlewareKeys = keys(middleware);

        const listMiddleware = map(middlewareKeys, (key) => {
          const methodName = middleware[key];
          const newParams = params ? params[key] : [];

          return {methodName: methodName, params: debugArguments(newParams)};
        });

        groupMiddleware.push(...listMiddleware);
      }

      if (route) {
        const {method, path, methodName} = route;
        const newParams = params ? params[methodName] : [];

        groupRoute = {method, path, methodName, params: debugArguments(newParams)};
        data.push(groupRoute)
      }

      if (route) {
        groupMiddleware = groupMiddleware.map((item) => {
          return {...item, routeMethod: groupRoute.method}
        });

        data.push(...groupMiddleware);
      } else {
        data.push(...groupMiddleware)
      }
    },
    show: () => {
      if (log) {
        console.log(name);
        console.table(data);
        data = [];
      }
    }
  }
};

export const debugArguments = (newParams: FunArgs[]) => {

  return newParams && newParams.map((arg) => {

    return arg.propName ? `${arg.propName}: ${arg.propSource}` : arg.propSource;
  }).toString() || `ctx, next`;
};
