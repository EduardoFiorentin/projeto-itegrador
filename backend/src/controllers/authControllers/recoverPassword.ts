import { NextFunction, Request, Response } from "express";
import {StatusCodes} from "http-status-codes"
import { MailService } from "../../services";
import { JwtService } from "../../services";

// Recebe e valida um código de recuperação de senha 

export const recoverPasswordValidate = (req: Request, res: Response, next: NextFunction) => {

    const { code } = req.body

    if ( code && code.toString().length == 5) next()
    else 
        res.status(StatusCodes.BAD_REQUEST).json({error: "Código informado em formato inválido!"})

}

export const recoverPassword = async (req: Request, res: Response) => {
    try {

        // receber request 
        // // const { code } = req.body
        // console.log("Teste de payload: ", req.user)


        // // autenticar codigo 
        // const response = true

        // // remove codigo do banco 

        // // resposta
        // if (response) res.status(StatusCodes.OK).json({message: "Codigo verificado com sucesso!", token: "dadfrgadfrgwsefwewg"})
        // else res.status(StatusCodes.BAD_REQUEST).json({message: "Codigo inválido!"})
        res.status(200).send("Retorno")

    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}