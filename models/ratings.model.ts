import { Schema, Document, model } from 'mongoose';

const ratingsSchema = new Schema({



    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    },
    phone: {
        type: Schema.Types.ObjectId,
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

ratingsSchema.pre<IRatings>('save', function (next) {
    this.created = new Date();
    next();
});


interface IRatings extends Document {
    phone: string,
    usuario: string,
    post: string,
    positivo: string,
    negativo: string,
    val_display: string,
    val_cpu: string,
    val_aspecto: string,
    val_camara: string,
    val_bateria: string,
    created: Date;
}

export const Ratings = model<IRatings>('Ratings', ratingsSchema);