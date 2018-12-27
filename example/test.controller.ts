import {Body, Context, Controller, Delete, Get, Middleware, Next, Params, Post, Put, Response} from '../src/decorators';

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