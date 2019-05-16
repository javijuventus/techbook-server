"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.app.set('port', process.env.PORT || 3000);
    }
    Server.prototype.start = function (callback) {
        this.app.listen(this.app.get('port'), callback);
    };
    return Server;
}());
exports.default = Server;
