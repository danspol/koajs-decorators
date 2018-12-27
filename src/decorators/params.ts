import {updateMetaParams} from '../meta';

export enum PropSource {
  Body = 'body',
  Params = 'params',
  Query = 'query',
  State = 'state',
  Request = 'req',
  Response = 'res',
  Next = 'next',
  Context = 'ctx',
}

function decorateParams(propSource: PropSource) {

  return function (propName?: string) {
    return function (target: any, methodName: string, index: number) {

      updateMetaParams(target[methodName], methodName, index, {propSource, propName})
    }
  }
}

export const Params = decorateParams(PropSource.Params);
export const Body = decorateParams(PropSource.Body);
export const Query = decorateParams(PropSource.Query);
export const State = decorateParams(PropSource.State);

export const Context = decorateParams(PropSource.Context);
export const Request = decorateParams(PropSource.Request);
export const Response = decorateParams(PropSource.Response);
export const Next = decorateParams(PropSource.Next);