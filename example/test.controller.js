"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../src/decorators");
function check(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield next();
    });
}
class AuthMiddleware {
    isAuthenticated(next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield next();
        });
    }
}
__decorate([
    decorators_1.Middleware(),
    __param(0, decorators_1.Next())
], AuthMiddleware.prototype, "isAuthenticated", null);
let TestController = class TestController extends AuthMiddleware {
    existToken(next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield next();
        });
    }
    existValidToken(next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield next();
        });
    }
    getById(id, ctx) {
        ctx.body = id;
    }
    put(user, id, res) {
        console.log("del ", id);
    }
    post(user, res) {
        console.log("create user ");
    }
    del(user, id, res) {
        console.log("delete user ", id);
    }
    testMiddleware() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
__decorate([
    decorators_1.Middleware(),
    __param(0, decorators_1.Next())
], TestController.prototype, "existToken", null);
__decorate([
    decorators_1.Middleware(),
    __param(0, decorators_1.Next())
], TestController.prototype, "existValidToken", null);
__decorate([
    decorators_1.Get("/:id"),
    __param(0, decorators_1.Params('id')), __param(1, decorators_1.Context())
], TestController.prototype, "getById", null);
__decorate([
    decorators_1.Put("/:id"),
    decorators_1.Middleware(check),
    __param(0, decorators_1.Body()), __param(1, decorators_1.Params('id')), __param(2, decorators_1.Response())
], TestController.prototype, "put", null);
__decorate([
    decorators_1.Post("/"),
    __param(0, decorators_1.Body()), __param(1, decorators_1.Response())
], TestController.prototype, "post", null);
__decorate([
    decorators_1.Delete("/:id"),
    __param(0, decorators_1.Body()), __param(1, decorators_1.Params('id')), __param(2, decorators_1.Response())
], TestController.prototype, "del", null);
TestController = __decorate([
    decorators_1.Controller({ prefix: '/users' })
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=test.controller.js.map