import {keys, map} from "lodash";
import {TargetArguments} from './meta';

export const decoratorLogs = (name, log = false) => {

  let data = [];

  return {
    log: ({route, controller, params, middleware}) => {

      let groupMiddleware = [];
      let groupRoute = {};

      if (controller) {
        data.push(controller);
      }

      if (middleware) {
        const middlewareKeys = keys(middleware);

        const listMiddleware = map(middlewareKeys, (key) => {
          const methodName = middleware[key].name;
          const newParams = params ? params[key] : [];

          return {methodName: methodName, params: debugArguments(newParams)};
        });

        groupMiddleware.push(...listMiddleware);
      }

      if (route) {
        const {method, target, path, methodName} = route;
        const newParams = params[methodName];

        groupRoute = {method, path, methodName, params: debugArguments(newParams)};
      }

      if (route) {
        groupMiddleware = groupMiddleware.map((item) => {
          return {...item, routeMethod: groupRoute.method}
        });

        data.push(...groupMiddleware);
        data.push(groupRoute);

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

export const debugArguments = (newParams: TargetArguments[]) => {
  return newParams && newParams.map((arg) => {
    return arg.argumentName ? `${arg.argumentName}: ${arg.sourceArgument}` : arg.sourceArgument;
  }).toString() || `ctx, next`;
};
