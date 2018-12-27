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

async function check(ctx: any, next: any) {
  await next()
}

class AuthMiddleware {

  @Middleware()
  public async isAuthenticated(@Next() next: any) {
    await next();
  }
}

@Controller({prefix: '/users'})
export class TestController extends AuthMiddleware {

  @Middleware()
  public async existToken(@Next() next: any) {
    await next();
  }

  @Middleware()
  public async existValidToken(@Next() next: any) {
    await next();
  }

  @Get("/:id")
  public getById(@Params('id') id: number, @Context() ctx: any) {

    ctx.body = id;
  }

  @Put("/:id")
  @Middleware(check)
  public put(@Body() user: any, @Params('id') id: number, @Response() res: any) {

    console.log("some think");
  }

  @Post("/")
  public post(@Body() user: any, @Response() res: any) {

    console.log("some think");
  }

  @Delete("/:id")
  public del(@Body() user: any, @Params('id') id: number, @Response() res: any) {

    console.log("some think");
  }
}