"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const crypto_1 = __importDefault(require("crypto"));
function removePasswordFromSourceFn(source) {
    const token = 'password';
    source[token] = undefined;
    return source;
}
function BuildFilterFn(filter) {
    const result = {};
    const idToken = '_id';
    const filterEntries = lodash_1.default.entries(filter);
    const filterEntriesWithoutId = lodash_1.default.filter(filterEntries, ([k]) => !lodash_1.default.eq(k, idToken));
    if (lodash_1.default.some(filterEntries, ([k]) => lodash_1.default.eq(k, idToken))) {
        result[idToken] = filter[idToken];
    }
    for (const [key, value] of filterEntriesWithoutId) {
        if (lodash_1.default.isString(value)) {
            const token = value.split(' ')[0];
            const valueString = value.substring(token.length).trim();
            const getParamFn = getParam(token);
            if (getParamFn === false) {
                result[key] = value;
            }
            else {
                result[key] = getParamFn(valueString);
            }
        }
        else {
            result[key] = value;
        }
    }
    console.log(result);
    return result;
}
function getParam(token) {
    if (lodash_1.default.eq(token, 'ct')) {
        return containParam;
    }
    else if (lodash_1.default.eq(token, 'gather')) {
        return gatherParam;
    }
    else if (lodash_1.default.eq(token, 'less')) {
        return lessParam;
    }
    else {
        return false;
    }
}
function containParam(value) {
    return {
        '$regex': value,
        '$options': 'i'
    };
}
function gatherParam(value) {
    return {
        'qty': {
            '$gt': value
        }
    };
}
function lessParam(value) {
    return {
        'qty': {
            '$lt': value
        }
    };
}
function hashImage(value) {
    return crypto_1.default.createHash('md5').update(value).digest('hex');
}
exports.CollectionService = {
    buildFilterFn: BuildFilterFn,
    removePasswordFromSource: removePasswordFromSourceFn,
    hashImage: hashImage
};
