"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phones_model_1 = require("../models/phones.model");
var RatingsUpdate = /** @class */ (function () {
    function RatingsUpdate() {
    }
    RatingsUpdate.prototype.actualizarRatingCamara = function (phoneId, result) {
        if (result !== undefined) {
            phones_model_1.Phone.update({ "_id": phoneId }, { $set: { "valoraciones.avg_camara": Math.round(result) } }, { new: true }, function (err, res) {
                if (err)
                    throw err;
                return res;
            });
        }
    };
    RatingsUpdate.prototype.actualizarRatingAspecto = function (phoneId, result) {
        if (result !== undefined) {
            phones_model_1.Phone.update({ "_id": phoneId }, { $set: { "valoraciones.avg_aspecto": Math.round(result) } }, { new: true }, function (err, res) {
                if (err)
                    throw err;
                return res;
            });
        }
    };
    RatingsUpdate.prototype.actualizarRatingPantalla = function (phoneId, result) {
        if (result !== undefined) {
            phones_model_1.Phone.update({ "_id": phoneId }, { $set: { "valoraciones.avg_pantalla": Math.round(result) } }, { new: true }, function (err, res) {
                if (err)
                    throw err;
                return res;
            });
        }
    };
    RatingsUpdate.prototype.actualizarRatingCpu = function (phoneId, result) {
        if (result !== undefined) {
            phones_model_1.Phone.update({ "_id": phoneId }, { $set: { "valoraciones.avg_cpu": Math.round(result) } }, { new: true }, function (err, res) {
                if (err)
                    throw err;
                return res;
            });
        }
    };
    RatingsUpdate.prototype.actualizarRatingBateria = function (phoneId, result) {
        if (result !== undefined) {
            phones_model_1.Phone.update({ "_id": phoneId }, { $set: { "valoraciones.avg_bateria": Math.round(result) } }, { new: true }, function (err, res) {
                if (err)
                    throw err;
                return res;
            });
        }
    };
    return RatingsUpdate;
}());
exports.default = RatingsUpdate;
