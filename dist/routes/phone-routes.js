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
var phones_model_1 = require("../models/phones.model");
var file_system_1 = __importDefault(require("../classes/file-system"));
var phonesRoutes = express_1.Router();
var fileSystem = new file_system_1.default();
//Obtener últimos Moviles
phonesRoutes.get('/latest', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var pagina, skip, phones;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pagina = Number(req.query.pagina) || 1;
                skip = pagina - 1;
                skip = skip * 10;
                return [4 /*yield*/, phones_model_1.Phone.find()
                        .sort({ fechaLanzamiento: -1 }) //Ordena por ID de forma descendiente
                        .skip(skip)
                        .limit(10)
                        .exec()];
            case 1:
                phones = _a.sent();
                res.json({
                    ok: true,
                    pagina: pagina,
                    phones: phones
                });
                return [2 /*return*/];
        }
    });
}); });
//Obtener Moviles mas likes
phonesRoutes.get('/likes', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var pagina, skip, phones, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pagina = Number(req.query.pagina) || 1;
                skip = pagina - 1;
                skip = skip * 10;
                return [4 /*yield*/, phones_model_1.Phone.find()
                        .sort({ num_positivos: -1 }) //Ordena por ID de forma descendiente
                        .skip(skip)
                        .limit(10)
                        .exec()];
            case 1:
                phones = _a.sent();
                res.json({
                    ok: true,
                    pagina: pagina,
                    phones: phones
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.json({
                    ok: false,
                    message: err_1
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
phonesRoutes.get('/dislikes', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var pagina, skip, phones, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pagina = Number(req.query.pagina) || 1;
                skip = pagina - 1;
                skip = skip * 10;
                return [4 /*yield*/, phones_model_1.Phone.find()
                        .sort({ num_negativos: -1 }) //Ordena por ID de forma descendiente
                        .skip(skip)
                        .limit(10)
                        .exec()];
            case 1:
                phones = _a.sent();
                res.json({
                    ok: true,
                    pagina: pagina,
                    phones: phones
                });
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
//Obtener Moviles más populares
phonesRoutes.get('/popular', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var pagina, skip, phones, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pagina = Number(req.query.pagina) || 1;
                skip = pagina - 1;
                skip = skip * 10;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, phones_model_1.Phone.aggregate([{
                            $project: {
                                marca: 1,
                                modelo: 1,
                                img: 1,
                                fechaLanzamiento: 1,
                                total: { $subtract: ["$num_positivos", "$num_negativos"] },
                            }
                        }])
                        .match({ total: { $lt: 0 } })
                        .sort({ total: -1 })
                        .skip(10)
                        .limit(10)
                        .exec()];
            case 2:
                phones = _a.sent();
                res.json({
                    ok: true,
                    pagina: pagina,
                    phones: phones
                });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.json({
                    ok: false,
                    message: err_3
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//Crear moviles
phonesRoutes.post('/', [autenticacion_1.verificaToken], function (req, res) {
    //He puesto el await
    var body = req.body;
    phones_model_1.Phone.create(body).then(function (phone) {
        res.json({
            ok: true,
            phone: phone
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Specific phone
phonesRoutes.get('/:phoneId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var phone, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, phones_model_1.Phone.findById(req.params.phoneId)];
            case 1:
                phone = _a.sent();
                res.json(phone);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.json({
                    ok: false,
                    message: err_4
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Buscar por Marca
phonesRoutes.post('/buscar/marca', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var pagina, skip, query;
    return __generator(this, function (_a) {
        pagina = Number(req.query.pagina) || 1;
        skip = pagina - 1;
        skip = skip * 10;
        query = req.body.query;
        phones_model_1.Phone.find({
            marca: {
                $regex: new RegExp(query)
            }
        }, function (err, phones) {
            if (err)
                throw res.json({ ok: false, err: err, mensaje: "No se encontró ningún resultado" });
            res.json({
                ok: true,
                pagina: pagina,
                phones: phones
            });
        })
            .skip(skip)
            .sort({ marca: -1 })
            .limit(10);
        return [2 /*return*/];
    });
}); });
//Buscar por Modelo
phonesRoutes.post('/buscar/modelo', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var pagina, skip, query;
    return __generator(this, function (_a) {
        pagina = Number(req.query.pagina) || 1;
        skip = pagina - 1;
        skip = skip * 10;
        query = req.body.query;
        phones_model_1.Phone.find({
            modelo: {
                $regex: new RegExp(query)
            }
        }, function (err, phones) {
            if (err)
                throw res.json({ ok: false, err: err, mensaje: "No se encontró ningún resultado" });
            res.json({
                ok: true,
                pagina: pagina,
                phones: phones
            });
        })
            .skip(skip)
            .sort({ marca: -1 })
            .limit(10);
        return [2 /*return*/];
    });
}); });
//Delete phone
phonesRoutes.delete('/:phoneId', [autenticacion_1.verificaToken], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var phoneId, removedPhone, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phoneId = req.params.phoneId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, phones_model_1.Phone.deleteOne({
                        _id: phoneId
                    })];
            case 2:
                removedPhone = _a.sent();
                return [4 /*yield*/, fileSystem.borrarCapetaMovil(phoneId)];
            case 3:
                _a.sent();
                res.json(removedPhone);
                return [3 /*break*/, 5];
            case 4:
                err_5 = _a.sent();
                res.json({
                    ok: false,
                    message: err_5
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//Update a phone
phonesRoutes.patch('/:phoneId', [autenticacion_1.verificaToken], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var updatePhone, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, phones_model_1.Phone.updateOne({
                        _id: req.params.phoneId
                    }, {
                        $set: {
                            marca: req.body.marca,
                            modelo: req.body.modelo,
                            cpu: req.body.cpu,
                            ram: req.body.ram,
                            almacenamiento: req.body.almacenamiento,
                            camara: req.body.camara,
                            bateria: req.body.bateria,
                            pantalla: req.body.pantalla,
                            img: req.body.img,
                            fechaLanzamiento: req.body.fechaLanzamiento
                        }
                    })];
            case 1:
                updatePhone = _a.sent();
                res.json(updatePhone);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.json({
                    ok: false,
                    message: err_6
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Guardar las imagenes en temporal para ese movil
phonesRoutes.post('/upload/:phoneId', [autenticacion_1.verificaToken], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var file, phoneId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.files) {
                    return [2 /*return*/, res.status(400).json({
                            mensaje: 'No se subió ningun archivo'
                        })];
                }
                file = req.files.img;
                if (!file) {
                    return [2 /*return*/, res.status(400).json({
                            mensaje: 'No se subió ningun archivo - image'
                        })];
                }
                if (!file.mimetype.includes('image')) {
                    return [2 /*return*/, res.status(400).json({
                            mensaje: 'No se subió ninguna imagen'
                        })];
                }
                phoneId = req.params.phoneId;
                return [4 /*yield*/, fileSystem.guardarImagenTemporal(file, phoneId)];
            case 1:
                _a.sent();
                res.status(200).json({
                    ok: true,
                    file: file.mimetype,
                    mensaje: 'Imagen temporal subida correctamente'
                });
                return [2 /*return*/];
        }
    });
}); });
phonesRoutes.patch('/upload/:phoneId', [autenticacion_1.verificaToken], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var body, phoneId, imagenes;
    return __generator(this, function (_a) {
        body = req.body;
        phoneId = req.params.phoneId;
        imagenes = fileSystem.imagenesDeTempHaciaPhone(phoneId);
        body.img = imagenes;
        phones_model_1.Phone.updateOne({ _id: phoneId }, {
            $set: {
                img: body.img,
            }
        }, function (err, phoneUpdated) {
            if (err)
                throw res.json({ ok: false, err: err });
            res.json({
                ok: true,
                phoneUpdated: phoneUpdated,
                mensaje: 'Imagen guardada en la base de datos'
            });
        });
        return [2 /*return*/];
    });
}); });
phonesRoutes.get('/imagen/:phoneId/:img', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var phoneId, img, pathFoto;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phoneId = req.params.phoneId;
                img = req.params.img;
                return [4 /*yield*/, fileSystem.getFotoMovil(phoneId, img)];
            case 1:
                pathFoto = _a.sent();
                res.sendFile(pathFoto);
                return [2 /*return*/];
        }
    });
}); });
exports.default = phonesRoutes;
