"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const _1 = require(".");
const generateTokenFn = (username, roles) => {
    const data = {};
    const expiredIn = new Date(Date.now());
    expiredIn.setHours(expiredIn.getHours() + 720);
    data.roles = roles;
    data.user = username;
    data.token = _1.CreateToken(data);
    data.expiredIn = expiredIn;
    return data;
};
exports.AuthService = {
    generateToken: generateTokenFn
};
