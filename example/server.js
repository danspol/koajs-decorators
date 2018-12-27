"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const src_1 = require("../src");
const test_controller_1 = require("./test.controller");
const testRouter = src_1.UseDecorator(test_controller_1.TestController, true);
const app = new Koa();
app
    .use(testRouter.allowedMethods())
    .use(testRouter.routes());
// const data = testRouter.stack.map((options) => {
//
//   return {
//     prefix: options.opts.prefix,
//     path: options.path,
//     parameters: options.paramNames.map((params) => params.name),
//     methods: options.methods
//   };
// });const data = testRouter.stack.map((options) => {
//
//   return {
//     prefix: options.opts.prefix,
//     path: options.path,
//     parameters: options.paramNames.map((params) => params.name),
//     methods: options.methods
//   };
// });
// console.table(data);
app.listen(3000, () => {
    console.log("Server is startes at port 3000");
});
//# sourceMappingURL=server.js.map