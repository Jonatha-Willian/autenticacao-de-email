import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import JWT from 'jsonwebtoken';

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
       let suscess: boolean = false;
        // Fazer verificação de auth
        if(req.headers.authorization) {
            //Pula o basic e pega o hash
            let hash = req.headers.authorization.substring(6);
            //Decodifica o hash para string
            let deccoded: string = Buffer.from(hash, 'base64').toString();
            //Pega o email e senha separados por :
            let data: string[] = deccoded.split(':');
            //verifica se tem email e senha
            if(data.length === 2) {
                //acha o usuário com email e senha no banco de dados
                let hasUser = await User.findOne({
                    where: { email: data[0], password: data[1] }
                });
                //Se tiver usuário, passa para a próxima função
                if(hasUser) {
                    suscess = true;
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