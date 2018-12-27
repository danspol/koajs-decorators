import {MiddlewareDecorator, updateMetaMiddleware} from '../meta';

function decorateMiddleware() {

  return function (...middlewares: MiddlewareDecorator[]) {
    return function (target, methodName: string) {
      const targetMethod = target[methodName];
      let newValues = {};

      if (middlewares && middlewares.length > 0) {

        newValues = middlewares.reduce((result, middleware) => {
          return middleware ? {...result, [middleware.name]: middleware} : result;
        }, {});
      } else {
        newValues = {[methodName]: targetMethod};
      }

      updateMetaMiddleware(targetMethod, newValues);
    }
  }
}

export const Middleware = decorateMiddleware();
