"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ratingsSchema = new mongoose_1.Schema({
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    },
    phone: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Phone',
        required: [true, 'Debe de existir una referencia a un smartphone']
    },
    post: String,
    positivo: Boolean,
    negativo: Boolean,
    val_pantalla: Number,
    val_cpu: Number,
    val_aspecto: Number,
    val_camara: Number,
    val_bateria: Number,
    created: {
        type: Date,
        default: Date.now
    }
});
ratingsSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Ratings = mongoose_1.model('Ratings', ratingsSchema);
