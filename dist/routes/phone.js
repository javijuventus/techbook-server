"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var autenticacion_1 = require("../middlewares/autenticacion");
var phonesRoutes = express_1.Router();
phonesRoutes.post('/', [autenticacion_1.verificaToken], function (req, res) {
    res.json({
        ok: true
    });
});
exports.default = phonesRoutes;
