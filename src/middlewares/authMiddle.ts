import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
       let suscess: boolean = false;
        // Fazer verificação de auth: Bearer token
        if(req.headers.authorization) {
           
            const [authType, token] = req.headers.authorization.split(' ');
            if(authType === 'Bearer') {
                try{
                    // Verificar se o token é válido
                    const decoded = JWT.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string);
                    // se for válido, passar para a próxima etapa
                    suscess = true;
                }catch(err) {

                }

            }
        }
        if(suscess){
            next();
        } else {
            res.status(401);
            res.json({ error: 'Acesso negado/não autorizado.' });
        }
    }
}