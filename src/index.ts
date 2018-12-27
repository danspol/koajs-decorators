import * as Router from 'koa-router';
import {keys, map} from 'lodash';
import {FunArgs, getMetaControllerMethod, MetaRoute} from './meta';
import {decoratorLogs} from "./debug";
import {PropSource} from "./decorators/params";

const prepareParams = (ctx: Router.IRouterContext, next: () => Promise<any>, args: any): any[] => {
  const defaultParams = [ctx, next];

  if (args) {

    return args.map(({propSource, propName}: FunArgs) => {
      switch (propSource) {
        case PropSource.Next:
          return next;
        case PropSource.Context:
          return ctx;
        default:
          return propName ?
            ctx[propSource][propName] :
            ctx[propSource];
      }
    });
  }

  return defaultParams;
};

export const UseDecorator = (target: any, debug = false) => {
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

      const middlewares = map(middlewareKeys, (key) => {
        const target: Function = middleware[key];
        const newParams = params ? params[key] : [];

        return async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
          await target(...prepareParams(ctx, next, newParams));
        }
      });

      router.use(...middlewares);
    }

    if (route) {
      const {method, target, path, methodName} = route as MetaRoute;
      const newParams = params[methodName];

      router[method](path, async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
        await target(...prepareParams(ctx, next, newParams));
      });
    }
  }

  Logger.show();

  return router
};
