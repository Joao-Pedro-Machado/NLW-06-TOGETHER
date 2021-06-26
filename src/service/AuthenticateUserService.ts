import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UserRepositories";


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const userRepositories = getCustomRepository(UsersRepositories);

        // Verificar se o email existe
        const user = await userRepositories.findOne({
            email,
        });

        if(!user) {
            throw new Error("Email/Password incorrect");
        }

        // Verificar se senha está correta
        // 12345 / 231142543513413asaf4q3gq54q32

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        // Gerar token
        const token = sign(
            {
                email: user.email
            },
            "4f93ac9d10cb751b8c9c646bc9dbccb9",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token
    }
}

export { AuthenticateUserService }