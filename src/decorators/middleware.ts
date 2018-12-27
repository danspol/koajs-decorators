import {updateMetaMiddleware} from '../meta';

 async function Anonymous(ctx: any, next:  () => {}) {
   await next()
 }

function decorateMiddleware() {

  return function (...middlewares: Function[]) {
    return function (target: any, methodName: string) {
      let newValues = {};

      if (middlewares && middlewares.length > 0) {

        newValues = middlewares.reduce((result, middleware: Function) => {
          const {name} = middleware || Anonymous;

          return name ? {...result, [name]: middleware} : result;
        }, {});
      } else {
        newValues = {[methodName]: target[methodName]};
      }

      updateMetaMiddleware(target[methodName], newValues);
    }
  }
}

export const Middleware = decorateMiddleware();
