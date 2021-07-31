"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigParser = void 0;
const config = __importStar(require("../../configs/config"));
const ParseConfigFn = function (req, _, next) {
    // let confString: string;
    // if (process.env.NODE_ENV) {
    //   confString = require('../../configs/config.prod.js').prod;
    // }
    exports.ConfigParser.config = JSON.parse(JSON.stringify(config.default.dev));
    req.config = JSON.parse(JSON.stringify(config.default.dev));
    next();
};
exports.ConfigParser = {
    config: {},
    Parse: ParseConfigFn
};
