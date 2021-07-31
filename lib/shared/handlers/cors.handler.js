"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCors = void 0;
const c = require("cors");
exports.UseCors = function (app) {
    app.use(c({
        origin: true
    }));
    return app;
};
