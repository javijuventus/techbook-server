declare namespace Express {
    export interface Request {
        usuario: Usuario;
    }
}
 
interface Usuario {
    _id: string;
    nombre: string;
    email: string;
    password: string;
    avatar: string;
}
