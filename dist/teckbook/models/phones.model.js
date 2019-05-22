"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var phoneSchema = new mongoose_1.Schema({
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
            type: String
        }],
    num_positivos: {
        type: Number,
        default: 0
    },
    num_negativos: {
        type: Number,
        default: 0
    },
    ratingGlobal: {
        type: Number,
        default: 0
    },
    created: {
        type: Date
    }
});
phoneSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Phone = mongoose_1.model('Phone', phoneSchema);
