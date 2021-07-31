"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireJson = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
exports.RequireJson = (app) => {
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({
        extended: false
    }));
    return app;
};
