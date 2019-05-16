"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var autenticacion_1 = require("../middlewares/autenticacion");
var ratings_model_1 = require("../models/ratings.model");
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Types.ObjectId;
var ratingsRoutes = express_1.Router();
//Obtener todos los ratings
ratingsRoutes.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var pagina, skip, ratings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pagina = Number(req.query.pagina) || 1;
                skip = pagina - 1;
                skip = skip * 10;
                return [4 /*yield*/, ratings_model_1.Ratings.find()
                        .sort({ created: -1 }) //Ordena por ID de forma descendiente
                        .skip(skip)
                        .limit(10)
                        .populate('phone')
                        .populate('usuario')
                        .exec()];
            case 1:
                ratings = _a.sent();
                res.json({
                    ok: true,
                    pagina: pagina,
                    ratings: ratings
                });
                return [2 /*return*/];
        }
    });
}); });
//Crear ratings
ratingsRoutes.post('/', [autenticacion_1.verificaToken], function (req, res) {
    var body = req.body;
    body.usuario = req.usuario._id;
    body.phone = req.body.phone;
    ratings_model_1.Ratings.create(body).then(function (ratingsDB) { return __awaiter(_this, void 0, void 0, function () {
        var rating;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ratingsDB.populate('usuario').populate('phone').execPopulate()];
                case 1:
                    rating = _a.sent();
                    res.json({
                        ok: true,
                        rating: rating
                    });
                    return [2 /*return*/];
            }
        });
    }); }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Obtener phones top camra
ratingsRoutes.get('/camara/:phoneId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ratings_model_1.Ratings.aggregate([
                    { $match: { phone: ObjectId("" + req.params.phoneId) } },
                    { $group: { _id: null, average: { $avg: '$val_camara' } } }
                ], function (err, result) {
                    if (err)
                        throw err;
                    res.json({
                        result: result
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//Obtener phones top diseño
ratingsRoutes.get('/aspecto/:phoneId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ratings_model_1.Ratings.aggregate([
                    { $match: { phone: ObjectId("" + req.params.phoneId) } },
                    { $group: { _id: null, average: { $avg: '$val_aspecto' } } }
                ], function (err, result) {
                    if (err)
                        throw err;
                    res.json({
                        result: result
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//Obtener phones top cpu
ratingsRoutes.get('/cpu/:phoneId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ratings_model_1.Ratings.aggregate([
                    { $match: { phone: ObjectId("" + req.params.phoneId) } },
                    { $group: { _id: null, average: { $avg: '$val_cpu' } } }
                ], function (err, result) {
                    if (err)
                        throw err;
                    res.json({
                        result: result
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//Obtener phones top bateria
ratingsRoutes.get('/bateria/:phoneId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ratings_model_1.Ratings.aggregate([
                    { $match: { phone: ObjectId("" + req.params.phoneId) } },
                    { $group: { _id: null, average: { $avg: '$val_bateria' } } }
                ], function (err, result) {
                    if (err)
                        throw err;
                    res.json({
                        result: result
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//Obtener phones top pantalla
ratingsRoutes.get('/pantalla/:phoneId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ratings_model_1.Ratings.aggregate([
                    { $match: { phone: ObjectId("" + req.params.phoneId) } },
                    { $group: { _id: null, average: { $avg: '$val_pantalla' } } }
                ], function (err, result) {
                    if (err)
                        throw err;
                    res.json({
                        result: result
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Trae los rating de determinado movil
ratingsRoutes.get('/:phoneId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var pagina, skip, ratings, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pagina = Number(req.query.pagina) || 1;
                skip = pagina - 1;
                skip = skip * 10;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ratings_model_1.Ratings.find({
                        phone: { _id: req.params.phoneId }
                    })
                        .sort({ created: -1 }) //Ordena por ID de forma descendiente
                        .skip(skip)
                        .limit(10)
                        .populate('usuario')
                        .exec()];
            case 2:
                ratings = _a.sent();
                res.json(ratings);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.json({
                    ok: false,
                    message: err_1
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//Delete ratings
ratingsRoutes.delete('/:ratingsId', [autenticacion_1.verificaToken], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var removedRatings, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, ratings_model_1.Ratings.deleteOne({
                        _id: req.params.ratingsId
                    })];
            case 1:
                removedRatings = _a.sent();
                res.json(removedRatings);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.json({
                    ok: false,
                    message: err_2
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Update a ratings
ratingsRoutes.patch('/:ratingsId', [autenticacion_1.verificaToken], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newRating, updatedRatings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newRating = {
                    post: req.body.post,
                    positivo: req.body.positivo,
                    negativo: req.body.negativo,
                    val_pantalla: req.body.val_pantalla,
                    val_cpu: req.body.val_cpu,
                    val_aspecto: req.body.val_aspecto,
                    val_camara: req.body.val_camara,
                    val_bateria: req.body.val_bateria
                };
                return [4 /*yield*/, ratings_model_1.Ratings.findByIdAndUpdate(req.params.ratingsId, newRating, { new: true }, function (err, ratingDB) {
                        if (err)
                            throw err;
                        if (!ratingDB) {
                            return res.json({
                                ok: false,
                                mensaje: 'No existe un comentario con ese ID'
                            });
                        }
                        res.json({
                            ok: true,
                            rating: ratingDB
                        });
                    })];
            case 1:
                updatedRatings = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.default = ratingsRoutes;
