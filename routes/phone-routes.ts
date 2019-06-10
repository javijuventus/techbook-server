import { Router, Request, Response } from "express";
import { verificaToken } from '../middlewares/autenticacion';
import { Phone } from "../models/phones.model";
import FileSystem from '../classes/file-system';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const phonesRoutes = Router();
const fileSystem = new FileSystem();

//Obtener últimos Moviles
phonesRoutes.get('/latest', async (req: Request, res: Response) => {


    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const phones = await Phone.find()
        .sort({ fechaLanzamiento: -1 }) //Ordena por ID de forma descendiente
        .skip(skip)
        .limit(10)
        .exec()

    res.json({
        pagina,
        phones
    })
});
//Obtener moviles ordenados por  mejor camara
phonesRoutes.get('/camara', async (req: Request, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    try {
        await Phone.aggregate(
            [{
                $project: {
                    _id:1,
                    marca: 1,
                    modelo: 1,
                    img: 1,
                    fechaLanzamiento: 1,
                    camara:1,
                    pantalla:1,
                    cpu:1,
                    ram:1,
                    almacenamiento:1,
                    bateria:1,
                    num_positivos:1,
                    num_negativos:11,
                    valoraciones: 1,
                },

            },
            {
                $sort: {
                    "valoraciones.avg_camara": -1
                }
            },
            {
                $skip:skip
            },
            {
                $limit:10
            }
            

            ], function (err: any, phones: any) {
                if (err) throw err;

                res.json({
                    pagina,
                    phones
                });
            })
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }
});
//Obtener últimos Moviles
phonesRoutes.get('/pantalla', async (req: Request, res: Response) => {


    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    try {
        await Phone.aggregate(
            [{
                $project: {
                    _id:1,
                    marca: 1,
                    modelo: 1,
                    img: 1,
                    fechaLanzamiento: 1,
                    camara:1,
                    pantalla:1,
                    cpu:1,
                    ram:1,
                    almacenamiento:1,
                    bateria:1,
                    num_positivos:1,
                    num_negativos:11,
                    valoraciones: 1,
                },

            },
            {
                $sort: {
                    "valoraciones.avg_pantalla": -1
                }
            },
            {
                $skip:skip
            },
            {
                $limit:10
            }
            

            ], function (err: any, phones: any) {
                if (err) throw err;

                res.json({
                    pagina,
                    phones
                });
            })
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }
});
//Obtener últimos Moviles
phonesRoutes.get('/cpu', async (req: Request, res: Response) => {


    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    try {
        await Phone.aggregate(
            [{
                $project: {
                    _id:1,
                    marca: 1,
                    modelo: 1,
                    img: 1,
                    fechaLanzamiento: 1,
                    camara:1,
                    pantalla:1,
                    cpu:1,
                    ram:1,
                    almacenamiento:1,
                    bateria:1,
                    num_positivos:1,
                    num_negativos:11,
                    valoraciones: 1,
                },

            },
            {
                $sort: {
                    "valoraciones.avg_cpu": -1
                }
            },
            {
                $skip:skip
            },
            {
                $limit:10
            }
            

            ], function (err: any, phones: any) {
                if (err) throw err;

                res.json({
                    pagina,
                    phones
                });
            })
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }
});
//Obtener moviles por bateria
phonesRoutes.get('/bateria', async (req: Request, res: Response) => {


    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    try {
        await Phone.aggregate(
            [{
                $project: {
                    _id:1,
                    marca: 1,
                    modelo: 1,
                    img: 1,
                    fechaLanzamiento: 1,
                    camara:1,
                    pantalla:1,
                    cpu:1,
                    ram:1,
                    almacenamiento:1,
                    bateria:1,
                    num_positivos:1,
                    num_negativos:11,
                    valoraciones: 1,
                },

            },
            {
                $sort: {
                    "valoraciones.avg_bateria": -1
                }
            },
            {
                $skip:skip
            },
            {
                $limit:10
            }
            

            ], function (err: any, phones: any) {
                if (err) throw err;

                res.json({
                    pagina,
                    phones
                });
            })
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }
});
//Obtener moviles por aspecto
phonesRoutes.get('/aspecto', async (req: Request, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    try {
        await Phone.aggregate(
            [{
                $project: {
                    _id:1,
                    marca: 1,
                    modelo: 1,
                    img: 1,
                    fechaLanzamiento: 1,
                    camara:1,
                    pantalla:1,
                    cpu:1,
                    ram:1,
                    almacenamiento:1,
                    bateria:1,
                    num_positivos:1,
                    num_negativos:11,
                    valoraciones: 1,
                },

            },
            {
                $sort: {
                    "valoraciones.avg_aspecto": -1
                }
            },
            {
                $skip:skip
            },
            {
                $limit:10
            }
            

            ], function (err: any, phones: any) {
                if (err) throw err;

                res.json({
                    pagina,
                    phones
                });
            })
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }
});


//Obtener Moviles mas likes
phonesRoutes.get('/likes', async (req: Request, res: Response) => {

    try {

        let pagina = Number(req.query.pagina) || 1;
        let skip = pagina - 1;
        skip = skip * 10;

        const phones = await Phone.find()
            .sort({ num_positivos: -1 }) //Ordena por ID de forma descendiente
            .skip(skip)
            .limit(10)
            .exec()

        res.json({
            pagina,
            phones
        })
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }

});
phonesRoutes.get('/dislikes', async (req: Request, res: Response) => {

    try {

        let pagina = Number(req.query.pagina) || 1;
        let skip = pagina - 1;
        skip = skip * 10;

        const phones = await Phone.find()
            .sort({ num_negativos: -1 }) //Ordena por ID de forma descendiente
            .skip(skip)
            .limit(10)
            .exec()

        res.json({
            pagina,
            phones
        })
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }

});
//Obtener Moviles más populares
phonesRoutes.get('/popular', async (req: Request, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    try {
        await Phone.aggregate(
            [{
                $project: {
                    _id:1,
                    marca: 1,
                    modelo: 1,
                    img: 1,
                    fechaLanzamiento: 1,
                    camara:1,
                    pantalla:1,
                    cpu:1,
                    ram:1,
                    almacenamiento:1,
                    bateria:1,
                    num_positivos:1,
                    num_negativos:11,
                    valoraciones: 1,
                    total: { $avg: ["$valoraciones.avg_pantalla", "$valoraciones.avg_cpu","$valoraciones.avg_bateria","$valoraciones.avg_aspecto","$valoraciones.avg_camara"] }
                },

            },
            {
                $sort: {
                    "total":-1
                }
            },
            {
                $skip:skip
            },
            {
                $limit:10
            }
            

            ], function (err: any, phones: any) {
                if (err) throw err;

                res.json({
                    pagina,
                    phones
                });
            })
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }

});
//NO FUNCIONA
phonesRoutes.get('/avg/:phoneId', async (req, res) => {

    const phoneId = req.params.phoneId;
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    // //{$match: { "_id" : "ObjectId('5cd8a21738e3f73e4cedc10c')"}}
    try {
        const phones = await Phone.aggregate(
            [
                { $match: { _id: ObjectId('5cd8a21738e3f73e4cedc10c') } }

                , {
                    $project: {
                        marca: "$marca",
                        modelo: "$modelo",
                        pantalla: "$valoraciones.avg_pantalla",
                        camara: "$valoraciones.avg_camara",
                        cpu: "$valoraciones.avg_cpu",
                        bateria: "$valoraciones.avg_bateria",
                        aspecto: "$valoraciones.avg_aspecto",
                        sumaAvgs: { $sum: ["$valoraciones.avg_pantalla", "$valoraciones.avg_bateria", "$valoraciones.avg_camara", "$valoraciones.avg_cpu", "$valoraciones.avg_aspecto"] }

                    }
                }

                , { $group: { _id: { _id: "$_id" }, avgTotal: { $avg: "$sumaAvgs" } } }


            ], function (err: any, phones: any) {
                if (err) throw err;

                res.json({
                    ok:true,
                    pagina,
                    phones
                });
            });

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


    Phone.create(body).then(phone => {

        res.json({
            ok: true,
            phone
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    })
});

//Buscar movil por Id
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
//Buscar por Marca
phonesRoutes.post('/buscar/marca',  (req, res) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const query = req.body.query;
    Phone.find({

        marca: {
            $regex: new RegExp(query)
        }
    }, function (err, phones) {
        if (err) throw res.json({ ok: false, err, mensaje: "No se encontró ningún resultado" })
        res.json({
            ok: true,
            pagina,
            phones
        });
    })
        .skip(skip)
        .sort({ marca: -1 })
        .limit(10);

});

//Buscar por Modelo
phonesRoutes.post('/buscar/modelo',  (req, res) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const query = req.body.query;
     Phone.find({

        modelo: {
            $regex: new RegExp(query)
        }
    }, function (err, phones) {
        if (err) throw res.json({ ok: false, err, mensaje: "No se encontró ningún resultado" })
        res.json({
            ok: true,
            pagina,
            phones
        });
    })
        .skip(skip)
        .sort({ marca: -1 })
        .limit(10);


});

//Delete phone
phonesRoutes.delete('/:phoneId', [verificaToken], async (req: Request, res: Response) => {
    const phoneId = req.params.phoneId;
    try {
        const phone = await Phone.deleteOne({
            _id: phoneId
        });
        await fileSystem.borrarCapetaMovil(phoneId)
        res.json(phone);
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
        const phone = await Phone.updateOne({
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
        res.json(phone);
    } catch (err) {
        res.json({
            ok: false,
            message: err
        });
    }
});

//Guardar las imagenes en temporal para ese movil
phonesRoutes.post('/upload/:phoneId', [verificaToken], async (req: Request, res: Response) => {

    if (!req.files) {
        return res.status(400).json({
            mensaje: 'No se subió ningun archivo'
        });
    }

    const file: any = req.files.img;

    if (!file) {
        return res.status(400).json({
            mensaje: 'No se subió ningun archivo - image'
        });
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            mensaje: 'No se subió ninguna imagen'
        });
    }

    const phoneId = req.params.phoneId;
    await fileSystem.guardarImagenTemporal(file, phoneId);

    res.status(200).json({
        ok: true,
        file: file.mimetype,
        mensaje: 'Imagen temporal subida correctamente'
    });
})

phonesRoutes.patch('/upload/:phoneId', [verificaToken], async (req: Request, res: Response) => {

    const body = req.body;
    const phoneId = req.params.phoneId;
    const imagenes = fileSystem.imagenesDeTempHaciaPhone(phoneId);
    body.img = imagenes;

    Phone.updateOne(
        { _id: phoneId },
        {
            $set:
            {
                img: body.img,
            }
        }, (err, phoneUpdated) => {
            if (err) throw res.json({ ok: false, err });

            res.json({
                ok: true,
                phoneUpdated,
                mensaje: 'Imagen guardada en la base de datos'
            });
        });
})

phonesRoutes.get('/imagen/:phoneId/:img', async (req: any, res: Response) => {

    const phoneId = req.params.phoneId;
    const img = req.params.img;

    const pathFoto = await fileSystem.getFotoMovil(phoneId, img);

    res.sendFile(pathFoto);
});


export default phonesRoutes;