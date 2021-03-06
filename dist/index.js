"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var usuario_routes_1 = __importDefault(require("./routes/usuario-routes"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var phone_routes_1 = __importDefault(require("./routes/phone-routes"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var cors_1 = __importDefault(require("cors"));
var ratings_routes_1 = __importDefault(require("./routes/ratings-routes"));
var morgan = require('morgan');
var config = require('./classes/config');
var server = new server_1.default();
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// File Upload
server.app.use(express_fileupload_1.default());
server.app.use(morgan("dev"));
//Configuracion del cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Rutas de mi app
server.app.use('/user', usuario_routes_1.default);
server.app.use('/phones', phone_routes_1.default);
server.app.use('/ratings', ratings_routes_1.default);
//conectar db
mongoose_1.default.connect(config.db, { useNewUrlParser: true, useCreateIndex: true, }, (function (err) {
    if (err)
        throw err;
    console.log('Base de datos online');
}));
var connection = mongoose_1.default.connection;
connection.on('error', function () {
    console.log("MongoDB connection error. Asegurate de que MongoDB está corriendo");
});
connection.once('open', function () {
    console.log("Base de datos MongoDB establecida la conexión correctamente");
});
/* mongoose.connect('mongodb://techbook:techbook123@techbook-shard-00-00-jxncs.mongodb.net:27017,techbook-shard-00-01-jxncs.mongodb.net:27017,techbook-shard-00-02-jxncs.mongodb.net:27017/techbook?ssl=true&replicaSet=Techbook-shard-0&authSource=admin&retryWrites=true'
    , { useNewUrlParser: true, useCreateIndex: true }, ((err: any) => {
        if (err) throw err;
        console.log('Base de datos online');
    })); */
//Levantar express
server.start(function () {
    console.log("Servidor corriendo en puerto " + server.app.get('port'));
});
