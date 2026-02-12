import { Request, Response, NextFunction } from 'express';

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        // Fazer verificação de auth
        let sucess = true;

        if(sucess){
            next();
        } else {
            res.status(401);
            res.json({ error: 'Acesso negado/não autorizado.' });
         }
    }
}