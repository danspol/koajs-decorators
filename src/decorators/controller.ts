import {getMetaController} from '../meta';

type ControllerConfiguration = {
  prefix: string;
  rest?: boolean;
}

export const Controller = (options: ControllerConfiguration) => {

  return function (target) {
    const meta = getMetaController(target);

    if (options.prefix) {
      meta.prefix = options.prefix
    }
  }
};
