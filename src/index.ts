import * as Router from 'koa-router';
import {keys, map} from 'lodash';
import {getMetaControllerMethod} from './meta';
import {decoratorLogs} from './debug';
import {SourceArgument} from './decorators';

const handlerFactory = (targetFunction, targetParams) => {

  return async (ctx, next) => {

    const args = targetParams ? targetParams.map(({sourceArgument, argumentName}) => {
      if (sourceArgument === SourceArgument.Next) {
        return next;
      } else if (sourceArgument === SourceArgument.Context) {
        return ctx;
      } else {
        return argumentName ?
          ctx[sourceArgument][argumentName] :
          ctx[sourceArgument];
      }
    }) : [ctx, next];

    await targetFunction(...args);
  }
};

export const UseDecorator = (target, debug = false) => {
  const instanceClass = new target();
  const metaDescription = getMetaControllerMethod(instanceClass);
  const router = new Router();
  const Logger = decoratorLogs(target.name, debug);

  for (let {route, controller, params, middleware} of metaDescription) {

    Logger.log({route, controller, params, middleware});

    if (controller) {
      router.prefix(controller.prefix)
    }

    if (middleware) {
      const middlewareKeys = keys(middleware);

      const listMiddleware = map(middlewareKeys, (key) => {
        const middlewareFn = middleware[key];
        const newParams = params ? params[key] : [];
        return handlerFactory(middlewareFn, newParams);
      });

      router.use(...listMiddleware);
    }

    if (route) {
      const {method, target, path, methodName} = route;
      const newParams = params[methodName];
      router[method](path, handlerFactory(target, newParams));
    }
  }

  Logger.show();

  return router
};
