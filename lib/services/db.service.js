"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongodb_1 = require("mongodb");
const getDatabaseFn = (req) => {
    const config = req.config;
    console.log(req.attr_name);
    return new mongodb_1.MongoClient(config.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};
const addCollectionFn = async (_db, name) => {
    return _db.createCollection(name, {});
};
const createCollectionIfEmpty = async (_db, name) => {
    if (await _db.listCollections({ name: name }).hasNext()) {
        return _db.collection(name);
    }
    return addCollectionFn(_db, name);
};
const getCollectionFn = async (_db, name) => {
    return createCollectionIfEmpty(_db, name);
};
exports.db = {
    GetDatabase: getDatabaseFn,
    AddCollection: addCollectionFn,
    GetCollection: getCollectionFn
};
