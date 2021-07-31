"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashFn = function (plaintextPassword) {
    const salt = bcrypt_1.default.genSaltSync(exports.PasswordService.saltRounds);
    return bcrypt_1.default.hashSync(plaintextPassword, salt);
};
const compareFn = (plantext, hash) => bcrypt_1.default.compareSync(plantext, hash);
exports.PasswordService = {
    saltRounds: 10,
    hash: hashFn,
    compare: compareFn
};
