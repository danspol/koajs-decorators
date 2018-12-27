# koajs-decorators

Example
-------------
Server server.ts
```typescript

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
```

File test.controller.ts test
```typescript
import {
  Body,
  Context,
  Controller,
  Delete,
  Get,
  Middleware,
  Next,
  Params,
  Post,
  Put,
  Response
} from 'koajs-decorators/lib';

async function check(ctx, next) {
  await next()
}

class AuthMiddleware {

  @Middleware()
  public async isAuthenticated(@Next() next) {
    await next();
  }
}

@Controller({prefix: '/users'})
export class TestController extends AuthMiddleware {

  @Middleware()
  public async existToken(@Next() next) {
    await next();
  }

  @Middleware()
  public async existValidToken(@Next() next) {
    await next();
  }

  @Get("/:id")
  public getById(@Params('id') id, @Context() ctx) {

    ctx.body = id;
  }

  @Put("/:id")
  @Middleware(check)
  public put(@Body() user, @Params('id') id, @Response() res) {

    console.log("some think");
  }

  @Post("/")
  public post(@Body() user, @Response() res) {

    console.log("some think");
  }

  @Delete("/:id")
  public del(@Body() user, @Params('id') id, @Response() res) {

    console.log("some think");
  }
}
```