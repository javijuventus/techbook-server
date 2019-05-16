import { Router, Request, Response } from "express";
import { verificaToken } from '../middlewares/autenticacion';
import { Ratings } from "../models/ratings.model";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;


const ratingsRoutes = Router();

//Obtener todos los ratings
ratingsRoutes.get('/', async (req: Request, res: Response) => {


    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const ratings = await Ratings.find()
        .sort({ created: -1 }) //Ordena por ID de forma descendiente
        .skip(skip)
        .limit(10)
        .populate('phone')
        .populate('usuario')
        .exec();

    res.json({
        ok: true,
        pagina,
        ratings
    })
});


//Crear ratings
ratingsRoutes.post('/', [verificaToken], (req: Request, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;
    body.phone = req.body.phone;

    Ratings.create(body).then(async ratingsDB => {

        const rating = await ratingsDB.populate('usuario').populate('phone').execPopulate();

        res.json({
            ok: true,
            rating
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    })
});

//Obtener phones top camra
ratingsRoutes.get('/camara/:phoneId', async (req: Request, res: Response) => {

    await Ratings.aggregate([
        { $match: { phone: ObjectId(`${req.params.phoneId}`) } },
        { $group: { _id: null, average: { $avg: '$val_camara' } } }
    ], function (err: any, result: any) {
        if (err) throw err;
        res.json({
            result
        })

    });

});

//Obtener phones top diseño
ratingsRoutes.get('/aspecto/:phoneId', async (req: Request, res: Response) => {

    await Ratings.aggregate([
        { $match: { phone: ObjectId(`${req.params.phoneId}`) } },
        { $group: { _id: null, average: { $avg: '$val_aspecto' } } }
    ], function (err: any, result: any) {
        if (err) throw err;
        res.json({
            result
        })

    });

});

//Obtener phones top cpu
ratingsRoutes.get('/cpu/:phoneId', async (req: Request, res: Response) => {

    await Ratings.aggregate([
        { $match: { phone: ObjectId(`${req.params.phoneId}`) } },
        { $group: { _id: null, average: { $avg: '$val_cpu' } } }
    ], function (err: any, result: any) {
        if (err) throw err;
        res.json({
            result
        })

    });

});

//Obtener phones top bateria
ratingsRoutes.get('/bateria/:phoneId', async (req: Request, res: Response) => {

    await Ratings.aggregate([
        { $match: { phone: ObjectId(`${req.params.phoneId}`) } },
        { $group: { _id: null, average: { $avg: '$val_bateria' } } }
    ], function (err: any, result: any) {
        if (err) throw err;
        res.json({
            result
        })
    });


});

//Obtener phones top pantalla
ratingsRoutes.get('/pantalla/:phoneId', async (req: Request, res: Response) => {

    await Ratings.aggregate([
        { $match: { phone: ObjectId(`${req.params.phoneId}`) } },
        { $group: { _id: null, average: { $avg: '$val_pantalla' } } }
    ], function (err: any, result: any) {
        if (err) throw err;
        res.json({
            result
        })
    });


});



// Trae los rating de determinado movil
ratingsRoutes.get('/:phoneId', async (req, res) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    try {
        const ratings = await Ratings.find({
            phone: { _id: req.params.phoneId }
        })
            .sort({ created: -1 }) //Ordena por ID de forma descendiente
            .skip(skip)
            .limit(10)
            .populate('usuario')
            .exec();

        res.json(ratings);
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }

});

//Delete ratings
ratingsRoutes.delete('/:ratingsId', [verificaToken], async (req: Request, res: Response) => {
    try {
        const removedRatings = await Ratings.deleteOne({
            _id: req.params.ratingsId
        });
        res.json(removedRatings);
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }
});

//Update a ratings
ratingsRoutes.patch('/:ratingsId', [verificaToken], async (req: Request, res: Response) => {

    const newRating = {
        post: req.body.post,
        positivo: req.body.positivo,
        negativo: req.body.negativo,
        val_pantalla: req.body.val_pantalla,
        val_cpu: req.body.val_cpu,
        val_aspecto: req.body.val_aspecto,
        val_camara: req.body.val_camara,
        val_bateria: req.body.val_bateria
    };
    const updatedRatings = await Ratings.findByIdAndUpdate(req.params.ratingsId,
        newRating, { new: true }, (err, ratingDB) => {
            if (err) throw err;

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

        });
});

export default ratingsRoutes;