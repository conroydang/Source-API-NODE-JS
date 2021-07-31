"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const services_1 = require("../../services");
exports.RequestHandler = (handler) => {
    return (req, res) => {
        var _a;
        const collectionName = req.params['collection'].toLowerCase();
        const data = {
            id: (_a = req.params['id']) !== null && _a !== void 0 ? _a : req.query['id'],
            body: req.body,
            query: req.query
        };
        console.log(data.body);
        services_1.db.GetDatabase(req).connect(async (err, client) => {
            var _a;
            const _db = client.db();
            if (err) {
                res.send(services_1.ResponseService.error('Cannot connect to database'));
            }
            else if (_db) {
                try {
                    const result = await handler(await services_1.db.GetCollection(_db, collectionName), data);
                    res.send(services_1.ResponseService.ok(result));
                }
                catch (error) {
                    const message = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error;
                    res.send(services_1.ResponseService.error(message));
                }
                finally {
                    console.log('Close Db connect');
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
