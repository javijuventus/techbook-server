import Server from './classes/server';
import userRoutes from './routes/usuario-routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import phonesRoutes from './routes/phone-routes';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import ratingsRoutes from './routes/ratings-routes';
const morgan = require('morgan');
const config = require('./classes/config')

const server = new Server();

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// File Upload
server.app.use(fileUpload());

server.app.use(morgan("dev"));

//Configuracion del cors
server.app.use(cors({ origin: true, credentials: true }));
//Rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/phones', phonesRoutes);
server.app.use('/ratings', ratingsRoutes);


//conectar db
mongoose.connect( config.db
    , { useNewUrlParser: true, useCreateIndex: true, }, ((err: any) => {
        if (err) throw err;
        console.log('Base de datos online');
    }));

    const connection = mongoose.connection;

    connection.on('error', () => {
        console.log("MongoDB connection error. Asegurate de que MongoDB está corriendo");
    })

    connection.once('open', () => {

        console.log("Base de datos MongoDB establecida la conexión correctamente");
        
    })

/* mongoose.connect('mongodb://techbook:techbook123@techbook-shard-00-00-jxncs.mongodb.net:27017,techbook-shard-00-01-jxncs.mongodb.net:27017,techbook-shard-00-02-jxncs.mongodb.net:27017/techbook?ssl=true&replicaSet=Techbook-shard-0&authSource=admin&retryWrites=true'
    , { useNewUrlParser: true, useCreateIndex: true }, ((err: any) => {
        if (err) throw err;
        console.log('Base de datos online');
    })); */

//Levantar express

server.start(() => {

    console.log(`Servidor corriendo en puerto ${server.app.get('port')}`);

})