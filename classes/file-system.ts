import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';
import rimraf from 'rimraf';


export default class FileSystem {

    constructor() { }

    guardarImagenTemporal(file: FileUpload, phoneId: string) {


        return new Promise((resolve, reject) => {

            //crear carpetas
            const path = this.crearCarpetaTelefono(phoneId);

            //nombre del archivo

            const nombreArchivo = this.generarNombreUnico(file.name);

            //Mover el archivo del temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {

                if (err) {
                    //no se puede mover
                    reject(err);
                } else {
                    //todo salio bien
                    resolve();
                }

            })
        })



    }

    private generarNombreUnico(nombreOriginal: string) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid();

        return `${idUnico}.${extension}`;



    }

    private crearCarpetaTelefono(phoneId: string) {
        const pathPhone = path.resolve(__dirname, '../uploads/', phoneId);
        const pathPhoneTemp = pathPhone + '/temp';

        const existe = fs.existsSync(pathPhone);

        if (!existe) {

            fs.mkdirSync(pathPhone);
            fs.mkdirSync(pathPhoneTemp);
        }
        return pathPhoneTemp;
    }

    imagenesDeTempHaciaPhone(phoneId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads/', phoneId, 'temp');
        const pathPhone = path.resolve(__dirname, '../uploads/', phoneId, 'phones');

        if (!fs.existsSync(pathTemp)) {

            return [];
        }

        if (!fs.existsSync(pathPhone)) {

            fs.mkdirSync(pathPhone);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp(phoneId);
        imagenesTemp.forEach(imagen => {
            fs.renameSync(`${pathTemp}/${imagen}`, `${pathPhone}/${imagen}`);
        });
        return imagenesTemp;
    }

    private obtenerImagenesEnTemp(phoneId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads', phoneId, 'temp');

        return fs.readdirSync(pathTemp) || []; //Retorna el nombre de todas las imagenes en un arreglo
    }


    async getFotoMovil(phoneId: string, img: string) {

        // Path Phones
        const pathTemp = path.resolve(__dirname, '../uploads', phoneId, 'phones', img);

        //Si la imagen existe
        const existe = await fs.existsSync(pathTemp) || [];

        if (!existe) {
            return path.resolve(__dirname, '../assets/mobile-icon.png');
        }
        return pathTemp;
    }

    async borrarCapetaMovil(phoneId: string) {

        // Path Phones
        const pathTemp = path.resolve(__dirname, '../uploads', phoneId);

        //Si la imagen existe
        const existe = await fs.existsSync(pathTemp) || [];

        if (!existe) {

            return;

        }
        await rimraf.sync(pathTemp);
    }


}