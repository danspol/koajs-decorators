"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("../meta");
exports.Controller = (options) => {
    return function (target) {
        const meta = meta_1.getMetaController(target);
        if (options.prefix) {
            meta.prefix = options.prefix;
        }
    };
};
//# sourceMappingURL=controller.js.map