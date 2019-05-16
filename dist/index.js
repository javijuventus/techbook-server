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
var server = new server_1.default();
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// File Upload
server.app.use(express_fileupload_1.default());
//Configuracion del cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Rutas de mi app
server.app.use('/user', usuario_routes_1.default);
server.app.use('/phones', phone_routes_1.default);
server.app.use('/ratings', ratings_routes_1.default);
//conectar db
mongoose_1.default.connect('mongodb://localhost:27017/techbook', { useNewUrlParser: true, useCreateIndex: true }, (function (err) {
    if (err)
        throw err;
    console.log('Base de datos online');
}));
//Levantar express
server.start(function () {
    console.log("Servidor corriendo en puerto " + server.port);
});
