"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
const model_1 = require("../model");
exports.ResponseService = {
    ok: (data) => new model_1.responseModel(200, data, ''),
    fail: (status, message) => new model_1.responseModel(status, {}, message),
    error: (message) => exports.ResponseService.fail(400, message),
    notFound: (name) => exports.ResponseService.fail(404, `Cannot find ${name}`),
    unauthorized: () => exports.ResponseService.fail(401, 'You have no permission to use this api')
};
