import express from 'express';


export default class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);
        this.app.get('/', (req,res) => res.send('Bienvenido a la Api rest'));
    }

    start(callback: Function) {
        this.app.listen(this.app.get('port'), callback);
    }


}