"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseModel = void 0;
;
exports.UseModel = function (req, handler) {
    const model = req.body;
    return handler(model);
};
