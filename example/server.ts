import * as Koa from 'koa';
import {TestController} from './test.controller';
import {UseDecorator} from 'koajs-decorators/lib';

const testRouter = UseDecorator(TestController, true);

const app = new Koa();
app
  .use(testRouter.allowedMethods())
  .use(testRouter.routes());

app.listen(3000, () => {
  console.log("Server is startes at port 3000");
});