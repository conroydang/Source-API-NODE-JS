"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionController = void 0;
const mongodb_1 = require("mongodb");
const collection_service_1 = require("../../services/collection.service");
exports.CollectionController = {
    getMany: async (collection, data) => {
        var _a, _b;
        const limit = Number.parseInt((_a = data.query) === null || _a === void 0 ? void 0 : _a.limit);
        const skip = Number.parseInt((_b = data.query) === null || _b === void 0 ? void 0 : _b.skip);
        let filter = {};
        Object.keys(data.query)
            .filter(k => ['limit', 'skip'].every(r => r !== k))
            .forEach(k => filter[k] = k === '_id' ? new mongodb_1.ObjectId(data.query[k]) : data.query[k]);
        filter = collection_service_1.CollectionService.buildFilterFn(filter);
        const result = await collection.find(filter, {
            limit: limit,
            skip: skip
        }).toArray();
        return result.map(r => collection_service_1.CollectionService.removePasswordFromSource(r));
    },
    getOne: async (collection, data) => {
        const obj = await collection.findOne({ '_id': new mongodb_1.ObjectId(data.id) });
        return collection_service_1.CollectionService.removePasswordFromSource(JSON.parse(JSON.stringify(obj)));
    },
    post: async (collection, data) => {
        await collection.insertOne(data.body);
        return 'ok';
    },
    put: async (collection, data) => {
        const obj = await collection.findOne({ '_id': new mongodb_1.ObjectId(data.id) });
        await collection.updateOne(obj, { $set: data.body });
        return 'ok';
    },
    delete: async (collection, data) => {
        await collection.findOneAndDelete({ '_id': new mongodb_1.ObjectId(data.id) });
        return 'ok';
    }
};
