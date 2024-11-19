import { NextFunction, Request, Response } from "express";
import {OK, StatusCodes} from "http-status-codes"
import { MailService } from "../../services";
import { JwtService } from "../../services";
import { ValidationExcept } from "../../services/Exceptions";
import jwt from "jsonwebtoken"
import { IUser } from "../../Interfaces/IUser";


export const signInValidations = (req: Request, res: Response, next: NextFunction) => { 
    
    const {email, password} = req.body

    if (!email || !password) 
        res.status(StatusCodes.BAD_REQUEST).json({error: "Corpo de requisição inválido!"})
    else next()

}

export const signIn = async (req: Request, res: Response) => {
    try {

        const { email, senha } = req.body
        // const token = req.headers['authorization'] || undefined

        // if (token) {
        //     console.log("Decodificação de token: ", JwtService.validateToken(token), " - ", JwtService.getTokenPayload(token))
        // }


        // console.log(email, senha)
        // chamada do banco 

        // const acessToken = "acesstokenjwt"
        // const code = 15474

        // await sendMail(
        //     "Nobre Arte <eduardoviniciusforentin@gmail.com>",
        //     "eduardofiorentin336@gmail.com",
        //     "Recuperação de senha",

        //     `<h1>Recuperar sua senha</h1>
        //     </br>
        //     <p>Utilize o seguinte código para recuperar sua senha: <strong>${code}</strong> </p> 
        //     </br> 
        //     <p style="color: red;">ATENÇÃO! Não compartilhe este código com ninguém!</p>`
        // )

        // const novoJwt = JwtService.generateToken({name: data.name, palavra: "Babuxca"})

        // if (data && token) {
        //     const response = {name: data.name, token: novoJwt}
        //     res.status(StatusCodes.OK).json(response)
        // }
        // else res.status(StatusCodes.BAD_REQUEST).json({message: "Usuário ou senha incorretos"})

        // Cria o token JWT

        const user = req.user as IUser

		const token = jwt.sign({ role: user.role}, "your-secret-key", {
			expiresIn: "1h",
		});

		res.status(StatusCodes.OK).json({ email: user?.email, name: user.name, role: user.role, token });

    }
    catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    
    }

}