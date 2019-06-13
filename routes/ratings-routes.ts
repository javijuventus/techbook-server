import { Router, Request, Response } from "express";
import { verificaToken } from '../middlewares/autenticacion';
import { Ratings } from '../models/ratings.model';
import mongoose from 'mongoose';
import { Phone } from '../models/phones.model';
import bodyParser from 'body-parser';
import RatingsUpdate from '../classes/rating';
const ObjectId = mongoose.Types.ObjectId;

const ratingsRoutes = Router();
const ratingsUpdate = new RatingsUpdate();

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
        .exec()

    res.json({
        ok: true,
        pagina,
        ratings
    })
});
// Trae los rating de determinado movil
ratingsRoutes.get('/phone/:phoneId', async (req, res) => {

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
//Trae un rating determinado de un usuario
ratingsRoutes.get('/:phoneId/:userId', async (req, res) => {

    try {
        const ratings = await Ratings.findOne({
            usuario: {_id: req.params.userId},
            phone: { _id: req.params.phoneId }
        }).then(phone => {
            res.json(phone);
        }).catch(err => {
            res.json({err})
            });


    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }

});
//Obtener rating por Id
ratingsRoutes.get('/id/:ratingId', async (req, res) => {

    try {
        const rating = await Ratings.findById(req.params.ratingId);
        res.json(rating);
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }

});
//Crear ratings
ratingsRoutes.post('/', [verificaToken], (req: Request, res: Response) => {

    const user = req.usuario;
    const newRating = req.body;
    newRating.usuario = user.usuario._id;

    const positivo = newRating.positivo;
    const negativo = newRating.negativo;


    Ratings.create(newRating).then(async ratingsDB => {

         await ratingsDB.populate('usuario').populate('phone').execPopulate().then( async newRating => {

            if (positivo) {
                await Phone.update(
                    { _id: newRating.phone },
                    { $inc: { num_positivos: 1 } }
                )
            }else if (negativo) {
                await Phone.update(
                    { _id: newRating.phone },
                    { $inc: { num_negativos: 1 } }
                )
            }
    
            res.status(200).json({
                ok: true,
                newRating
            });

         }).catch(err => {
             res.status(400).json(err);
         });

       



    });

});

//Obtener phones top camra
ratingsRoutes.get('/avg/camara/:phoneId/', async (req: Request, res: Response) => {

    const phoneId = req.params.phoneId;
    console.log(phoneId);
    await Ratings.aggregate([
        { $match: { phone: ObjectId(`${phoneId}`) } },
        { $group: { _id: { _id: "$phone" }, average: { $avg: '$val_camara' } } }
    ], function (err: any, result: any) {
        let media = result[0].average;
        if (err) throw err;

        if( result[0].average !== undefined){
             ratingsUpdate.actualizarRatingCamara(phoneId, media);
        }
        res.json({
            ok: true,
            result,
        });
        
    });

});

//Obtener phones top diseño
ratingsRoutes.get('/avg/aspecto/:phoneId/', async (req: Request, res: Response) => {

    const phoneId = req.params.phoneId;
    console.log(phoneId);
    await Ratings.aggregate([
        { $match: { phone: ObjectId(`${phoneId}`) } },
        { $group: { _id: { _id: "$phone" }, average: { $avg: '$val_aspecto' } } }
    ], function (err: any, result: any) {
        let media = result[0].average;
        if (err) throw err;

        if( result[0].average !== undefined){
             ratingsUpdate.actualizarRatingAspecto(phoneId, media);
        }
        res.json({
            ok: true,
            result,
        });
        
    });

});

//Obtener phones top cpu
ratingsRoutes.get('/avg/cpu/:phoneId/', async (req: Request, res: Response) => {

    const phoneId = req.params.phoneId;
    console.log(phoneId);
    await Ratings.aggregate([
        { $match: { phone: ObjectId(`${phoneId}`) } },
        { $group: { _id: { _id: "$phone" }, average: { $avg: '$val_cpu' } } }
    ], function (err: any, result: any) {
        let media = result[0].average;
        if (err) throw err;

        if( result[0].average !== undefined){
             ratingsUpdate.actualizarRatingCpu(phoneId, media);
        }
        res.json({
            ok: true,
            result,
        });
        
    });

});
ratingsRoutes.get('/avg/pantalla/:phoneId/', async (req: Request, res: Response) => {

    const phoneId = req.params.phoneId;
    console.log(phoneId);
    await Ratings.aggregate([
        { $match: { phone: ObjectId(`${phoneId}`) } },
        { $group: { _id: { _id: "$phone" }, average: { $avg: '$val_pantalla' } } }
    ], function (err: any, result: any) {
        let media = result[0].average;
        if (err) throw err;

        if( result[0].average !== undefined){
             ratingsUpdate.actualizarRatingPantalla(phoneId, media);
        }
        res.json({
            ok: true,
            result,
        });
        
    });

});
ratingsRoutes.get('/avg/bateria/:phoneId/', async (req: Request, res: Response) => {

    const phoneId = req.params.phoneId;
    console.log(phoneId);
    await Ratings.aggregate([
        { $match: { phone: ObjectId(`${phoneId}`) } },
        { $group: { _id: { _id: "$phone" }, average: { $avg: '$val_bateria' } } }
    ], function (err: any, result: any) {
        let media = result[0].average;
        if (err) throw err;

        if( result[0].average !== undefined){
             ratingsUpdate.actualizarRatingBateria(phoneId, media);
        }
        res.json({
            ok: true,
            result,
        });
        
    });

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
ratingsRoutes.post('/update', [verificaToken], async (req: Request, res: Response) => {

    const newRating = {
        post: req.body.post,
        _id: req.body._id,
        positivo: req.body.positivo,
        negativo: req.body.negativo,
        val_pantalla: req.body.val_pantalla,
        val_cpu: req.body.val_cpu,
        val_aspecto: req.body.val_aspecto,
        val_camara: req.body.val_camara,
        val_bateria: req.body.val_bateria
    };

    Ratings.findOneAndUpdate({ "_id": newRating._id },
    { $set: newRating  }, { new: true }, (err, phoneDB) => {
        if (err) throw err;

        if (!phoneDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un movil con ese ID'
            });
        }

        res.json({
            ok: true,
            phone: phoneDB
        });

    });
});

export default ratingsRoutes;