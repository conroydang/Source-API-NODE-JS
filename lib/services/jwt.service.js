"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeToken = exports.CreateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shared_1 = require("../shared");
const options = {
    expiresIn: '720h',
    algorithm: 'HS256'
};
exports.CreateToken = (payload) => jsonwebtoken_1.default.sign(payload, shared_1.ConfigParser.config.secret, options);
exports.DecodeToken = (token) => {
    var _a;
    let payload = null;
    try {
        payload = jsonwebtoken_1.default.verify(token, shared_1.ConfigParser.config.secret, options);
    }
    catch (err) {
        console.log((_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : err);
        payload = null;
    }
    return payload;
};
