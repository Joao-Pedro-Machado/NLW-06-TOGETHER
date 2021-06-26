import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
 
    // Receber o token
    const authToken = request.headers.authorization
    
    // Validar se o token está preenchido
    if(!authToken) {
        response.status(401).end();
    }
    // Ignora o primeiro item do array e coloca o segundo na variável token
    const [, token] = authToken.split(" ")

    // Validar se o token é válido
    try{
        const { sub } = verify(token, "4f93ac9d10cb751b8c9c646bc9dbccb9") as IPayload;

        request.user_id = sub

        return next()

    } catch(err) {

        return response.status(401).end();

    }
    
    // Recuperar informações do usuário

}