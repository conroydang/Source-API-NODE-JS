"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const services_1 = require("../../services");
exports.AuthController = {
    login: async function (collection, model) {
        var _a, _b;
        // Check if user exists
        const user = await collection.findOne({
            username: model.body.username
        });
        if (user && services_1.PasswordService.compare(model.body.password, (_a = user === null || user === void 0 ? void 0 : user.password) !== null && _a !== void 0 ? _a : '')) {
            return services_1.AuthService.generateToken(user.username, (_b = user === null || user === void 0 ? void 0 : user.roles) !== null && _b !== void 0 ? _b : []);
        }
        throw new Error('Username or Password were wrong');
    },
    register: async function (collection, model) {
        var _a;
        // Check if user exists
        let user = await collection.findOne({
            username: model.body.username
        });
        if (user) {
            throw new Error('User exists');
        }
        else {
            user = {
                username: model.body.username,
                fullname: model.body.fullname,
                password: services_1.PasswordService.hash(model.body.password),
                roles: [
                    'user'
                ]
            };
            await collection.insertOne(user);
            return services_1.AuthService.generateToken(user.username, (_a = user === null || user === void 0 ? void 0 : user.roles) !== null && _a !== void 0 ? _a : []);
        }
    }
};
