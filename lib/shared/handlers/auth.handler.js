"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHandler = void 0;
const services_1 = require("../../services");
const HandlerFn = (name) => {
    return (handler) => {
        return (req, res) => {
            const userCollectionName = name;
            const data = {
                body: req.body
            };
            services_1.db.GetDatabase(req).connect(async (err, client) => {
                const _db = client.db();
                if (_db) {
                    try {
                        const result = await handler(await services_1.db.GetCollection(_db, userCollectionName), data);
                        res.send(services_1.ResponseService.ok(result));
                    }
                    catch (error) {
                        res.send(services_1.ResponseService.error(error.message));
                    }
                    finally {
                        console.log('Connect Database Success');
                        await client.close();
                    }
                }
                else {
                    await client.close();
                    res.send(services_1.ResponseService.error('Cannot connect to database'));
                }
            });
        };
    };
};
const VerifyTokenFn = (req, res, next) => {
    var _a, _b;
    const authString = (_a = req.headers['authorization']) !== null && _a !== void 0 ? _a : '';
    if (authString) {
        const token = authString.split(' ')[1];
        const tokenType = authString.split(' ')[0];
        if (tokenType.toUpperCase() === 'BEARER' && token) {
            const payload = JSON.parse(JSON.stringify(services_1.DecodeToken(token)));
            if (payload) {
                exports.AuthHandler.config.roles = (_b = payload === null || payload === void 0 ? void 0 : payload.roles) !== null && _b !== void 0 ? _b : [];
                next();
            }
            else {
                res.send(services_1.ResponseService.unauthorized());
            }
        }
        else {
            res.send(services_1.ResponseService.unauthorized());
        }
    }
    else {
        res.send(services_1.ResponseService.unauthorized());
    }
};
const VerifyRolesFn = (...roles) => {
    return (_, res, next) => {
        if (roles.some(r => { var _a, _b; return ((_b = (_a = exports.AuthHandler.config) === null || _a === void 0 ? void 0 : _a.roles) !== null && _b !== void 0 ? _b : []).some(rr => rr === r); })) {
            next();
        }
        else {
            res.send(services_1.ResponseService.unauthorized());
        }
    };
};
exports.AuthHandler = {
    config: {},
    HandleLoginRequest: HandlerFn('users'),
    HandleRolesRequest: HandlerFn('roles'),
    VerifyToken: VerifyTokenFn,
    VerifyRoles: VerifyRolesFn
};
