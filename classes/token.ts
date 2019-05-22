import jwt from 'jsonwebtoken';
var config = require('./config');



//Clase estatica

export default class Token {

    private static seed: string = config.jwtSecret;
    private static caducidad: string = '30d';

    constructor() { }

    static getJwtToken(user: any): string {

        return jwt.sign({
            id: user._id, email: user.email
        }, this.seed, { expiresIn: this.caducidad });
    }

    static comprobarToken(userToken: string) {

        return new Promise((resolve, reject) => {

            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    //no confiar
                    reject();
                } else {
                    // token valido
                    resolve(decoded);
                }
            })
        });

    }
}