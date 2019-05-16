import { Response, Request, NextFunction} from 'express';
import Token from '../classes/token';





export const verificaToken = ( req: Request, res: Response, next: NextFunction) => {

    const userToken = req.get('x-token') || '';

    Token.comprobarToen( userToken ).then (  (decoded: any) => {
        req.usuario = decoded.usuario;
        next();
    }).catch( err => {
        res.json({
            ok:false,
            mensaje:'Token no es correcto'
        })
    })
}