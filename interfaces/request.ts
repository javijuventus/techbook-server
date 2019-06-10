declare namespace Express {
    export interface Request {
        usuario: Usuario;
    }
}
 
 interface Usuario {
    usuario?: any;
    _id: string;
    nombre: string;
    email: string;
    password: string;
    avatar: string;
}
