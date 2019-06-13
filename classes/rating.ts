import { Phone } from "../models/phones.model";

export default class RatingsUpdate {

    constructor() { }

     actualizarRatingCamara(phoneId: string, result: number) {

        if (result !== undefined) {
            Phone.update({ "_id": phoneId },
                { $set: { "valoraciones.avg_camara": Math.round(result) } }, { new: true }, (err, res) => {
                    if (err)  throw err;

                    return res;
                });
        }
    }
    
    actualizarRatingAspecto(phoneId: string, result: number) {

        if (result !== undefined) {
            Phone.update({ "_id": phoneId },
                { $set: { "valoraciones.avg_aspecto": Math.round(result) } }, { new: true }, (err, res) => {
                    if (err)  throw err;

                    return res;
                });
        }
    }
    
    actualizarRatingPantalla(phoneId: string, result: number) {

        if (result !== undefined) {
            Phone.update({ "_id": phoneId },
                { $set: { "valoraciones.avg_pantalla": Math.round(result) } }, { new: true }, (err, res) => {
                    if (err)  throw err;

                    return res;
                });
        }
    }
    
    actualizarRatingCpu(phoneId: string, result: number) {

        if (result !== undefined) {
            Phone.update({ "_id": phoneId },
                { $set: { "valoraciones.avg_cpu": Math.round(result) } }, { new: true }, (err, res) => {
                    if (err)  throw err;

                    return res;
                });
        }
    }
    
    actualizarRatingBateria(phoneId: string, result: number) {

        if (result !== undefined) {
            Phone.update({ "_id": phoneId },
                { $set: { "valoraciones.avg_bateria": Math.round(result) } }, { new: true }, (err, res) => {
                    if (err)  throw err;

                    return res;
                });
        }
    }
}