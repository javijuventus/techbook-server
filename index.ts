import Server from './classes/server';
import userRoutes from './routes/usuario-routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import phonesRoutes from './routes/phone-routes';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import ratingsRoutes from './routes/ratings-routes';
require('dotenv/config');

const server = new Server();

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// File Upload
server.app.use(fileUpload());

//Configuracion del cors
server.app.use(cors({ origin: true, credentials: true }));
//Rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/phones', phonesRoutes);
server.app.use('/ratings', ratingsRoutes);
server.app.use('/', (req,res) => res.send('Bienvenido a la Api rest'));


//conectar db
mongoose.connect('mongodb+srv://techbookAdmin:Techbook!_admin@techbook-jxncs.mongodb.net/test?retryWrites=true'
    , { useNewUrlParser: true, useCreateIndex: true }, ((err: any) => {
        if (err) throw err;
        console.log('Base de datos online');

    }));


/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://techbookAdmin:<password>@techbook-jxncs.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/





//Levantar express

server.start(() => {

    console.log(`Servidor corriendo en puerto ${server.app.get('port')}`);

})