import jwt from 'jsonwebtoken';




//Clase estatica

export default class Token {

    private static seed: string = 'seed-de-la-app-de-mi-projecto';
    private static caducidad: string = '30d';

    constructor() { }

    static getJwtToken(payload: any): string {

        return jwt.sign({
            usuario: payload
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