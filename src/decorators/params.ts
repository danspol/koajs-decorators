import {updateMetaParams} from '../meta';

export enum SourceArgument {
  Body = 'body',
  Params = 'params',
  Query = 'query',
  State = 'state',
  Request = 'req',
  Response = 'res',
  Next = 'next',
  Context = 'ctx',
}

function decorateParams(sourceArgument) {

  return function (argumentName?) {
    return function (target: any, methodName: string, index: number) {
      const targetMethod = target[methodName];

      updateMetaParams(targetMethod, methodName, index, {sourceArgument, argumentName})
    }
  }
}

export const Params = decorateParams(SourceArgument.Params);
export const Body = decorateParams(SourceArgument.Body);
export const Query = decorateParams(SourceArgument.Query);
export const State = decorateParams(SourceArgument.State);

export const Context = decorateParams(SourceArgument.Context);
export const Request = decorateParams(SourceArgument.Request);
export const Response = decorateParams(SourceArgument.Response);
export const Next = decorateParams(SourceArgument.Next);