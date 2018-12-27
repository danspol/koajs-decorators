import * as Koa from 'koa';
import {UseDecorator} from '../src';
import {TestController} from './test.controller';

const testRouter = UseDecorator(TestController, true);

const app = new Koa();
app
  .use(testRouter.allowedMethods())
  .use(testRouter.routes());

app.listen(3000, () => {
  console.log("Server is startes at port 3000");
});