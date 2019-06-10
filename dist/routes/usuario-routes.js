"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_model_1 = require("../models/usuario.model");
var bcrypt_1 = __importDefault(require("bcrypt"));
var token_1 = __importDefault(require("../classes/token"));
var autenticacion_1 = require("../middlewares/autenticacion");
var userRoutes = express_1.Router();
//Login
userRoutes.post('/login', function (req, res) {
    var body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctas'
            });
        }
        if (userDB.compararPassword(body.password)) {
            var tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.status(200).json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            res.status(400).json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctas'
            });
        }
    });
});
//Crear un usuario
userRoutes.post('/create', function (req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'Necesitas especificar un nombre de usuario y una contraseña' });
    }
    usuario_model_1.Usuario.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (user) {
            return res.status(400).json({ 'msg': 'El usuario ya existe' });
        }
        var newUser = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt_1.default.hashSync(req.body.password, 10),
            avatar: req.body.avatar
        };
        usuario_model_1.Usuario.create(newUser).then(function (userDB) {
            var tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        });
    });
});
// actualizar Usuario
userRoutes.post('/update', [autenticacion_1.verificaToken], function (req, res) {
    var data = req.usuario;
    var user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    usuario_model_1.Usuario.findByIdAndUpdate(data.usuario._id, user, { new: true }, function (err, userDB) {
        if (err)
            throw res.status(400).json(res);
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        var tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    });
});
userRoutes.get('/', [autenticacion_1.verificaToken], function (req, res) {
    var usuario = req.usuario;
    res.json({
        ok: true,
        usuario: usuario
    });
});
exports.default = userRoutes;
