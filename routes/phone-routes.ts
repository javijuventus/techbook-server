import { Router, Request, Response } from "express";
import { verificaToken } from '../middlewares/autenticacion';
import { Phone } from "../models/phones.model";
import { Ratings } from '../models/ratings.model';


const phonesRoutes = Router();

//Obtener Moviles
phonesRoutes.get('/', async (req: Request, res: Response) => {


    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const phones = await Phone.find()
        .sort({ _id: -1 }) //Ordena por ID de forma descendiente
        .skip(skip)
        .limit(10)
        .populate('usuario')
        .exec()

        res.json({
            ok: true,
            pagina,
            phones
        })
});

//Obtener Moviles mas likes
phonesRoutes.get('/likes', async (req: Request, res: Response) => {

    try {
        const phones = await Phone.aggregate(
            [{
                $project: {
                    marca: 1,
                    modelo: 1,
                    img: 1,
                    fechaLanzamiento: 1,
                    total: { $subtract: ["$num_positivos", "$num_negativos"] },
                }
            }]
        )
            .match({ total: { $gt: 0 } })
            .sort({ total: -1 })
            .limit(5)
            .exec()
        res.json(phones);
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }

});
//Obtener Moviles mas likes
phonesRoutes.get('/dislikes', async (req: Request, res: Response) => {

    try {
        const phones = await Phone.aggregate(
            [{
                $project: {
                    marca: 1,
                    modelo: 1,
                    img: 1,
                    fechaLanzamiento: 1,
                    total: { $subtract: ["$num_positivos", "$num_negativos"] },
                }
            }]
        )
            .match({ total: { $lt: 0 } })
            .sort({ total: 1 })
            .limit(5)
            .exec()
        res.json(phones);
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }

});

//Crear moviles
phonesRoutes.post('/', [verificaToken], (req: Request, res: Response) => {
//He puesto el await
    const body = req.body;

    Phone.create(body).then(phoneDB => {

        res.json({
            ok: true,
            phone: phoneDB
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    })
});

//Specific phone
phonesRoutes.get('/:phoneId', async (req, res) => {

    try {
        const phone = await Phone.findById(req.params.phoneId);
        res.json(phone);
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }

});

//Delete phone
phonesRoutes.delete('/:phoneId', [verificaToken], async (req: Request, res: Response) => {
    try {
        const removedPhone = await Phone.deleteOne({
            _id: req.params.phoneId
        });
        res.json(removedPhone);
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }
});

//Update a phone
phonesRoutes.patch('/:phoneId', [verificaToken], async (req: Request, res: Response) => {
    try {
        const updatePhone = await Phone.updateOne({
            _id: req.params.phoneId
        }, {
                $set:
                {
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
            });
        res.json(updatePhone);
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }
});



export default phonesRoutes;