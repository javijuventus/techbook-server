import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';




const userRoutes = Router();

//Login
userRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;

    Usuario.findOne({ email: body.email }, (err, userDB) => {

        if (err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctas'
            });
        }

        if (userDB.compararPassword(body.password)) {

            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.status(200).json({
                ok: true,
                token: tokenUser
            });

        } else {
            res.status(400).json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctas'
            });
        }

    });

});

//Crear un usuario
userRoutes.post('/create', (req: Request, res: Response) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'Necesitas especificar un nombre de usuario y una contraseña' });
    }

    Usuario.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (user) {
            return res.status(400).json({ 'msg': 'El usuario ya existe' });
        }
        const newUser = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.body.avatar
        }
        
        Usuario.create(newUser).then(userDB => {
    
            const tokenUser = Token.getJwtToken({
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

userRoutes.post('/update', verificaToken, (req: Request, res: Response) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    }

    Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
        if (err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = Token.getJwtToken({
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

userRoutes.get('/', [verificaToken], (req: any, res: Response) => {

    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });

});

export default userRoutes;