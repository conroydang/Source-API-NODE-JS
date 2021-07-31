"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseModel = void 0;
class responseModel {
    constructor(status, data, message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}
exports.responseModel = responseModel;
