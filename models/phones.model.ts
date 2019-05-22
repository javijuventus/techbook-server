import { Schema, Document, model } from 'mongoose';

const phoneSchema = new Schema({

    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    almacenamiento: {
        type: String,
        enum: ['8GB', '16GB', '32GB', '64GB', '128GB', '256GB'],
    },
    cpu: {
        type: String,
    },
    ram: {
        type: String,
        enum: ['1GB', '2GB', '3GB', '4GB', '6GB', '8GB']
    },
    pantalla: {
        type: String
    },
    camara: {
        delantera: String,
        trasera1: String,
        trasera2: String,
        trasera3: String
    },
    bateria: {
        type: String
    },
    fechaLanzamiento: {
        type: Date
    },
    img: [{
        type: String,
        default: 'mobile-icon.png'
    }],
    num_positivos: {
        type: Number,
        default: 0
    },
    num_negativos: {
        type: Number,
        default: 0
    },
    ratingGlobal:{
        type:Number,
        default:0
    },
    created: {
        type: Date
    }
});

phoneSchema.pre<IPhone>('save', function (next) {
    this.created = new Date();
    next();
});

interface IPhone extends Document {
    marca: string,
    modelo: string,
    cpu: string,
    ram: string,
    almacenamiento: string,
    camara: object,
    bateria: string,
    pantalla: string,
    img: string,
    num_positivos: number,
    num_negativos: number,
    fechaLanzamiento: Date,
    ratingGlobal: number,
    created: Date;
}

export const Phone = model<IPhone>('Phone', phoneSchema);