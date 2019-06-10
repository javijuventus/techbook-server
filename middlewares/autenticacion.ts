import { Response, Request, NextFunction} from 'express';
import Token from '../classes/token';





export const verificaToken = ( req: Request, res: Response, next: NextFunction) => {

    const userToken = req.get('x-token') || '';

    Token.comprobarToken( userToken ).then (  (decoded: any) => {
        req.usuario = decoded;
        next();
    }).catch( err => {
        res.json({
            ok:false,
            mensaje:'Token no es correcto'
        })
    })
}