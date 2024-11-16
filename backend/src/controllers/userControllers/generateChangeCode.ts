import { NextFunction, Request, Response } from "express";
import {StatusCodes} from "http-status-codes"
import { MailService } from "../../services";
import { JwtService } from "../../services";
import { ValidationExcept } from "../../services/Exceptions";

// Rota que gera o código de recuperação 

// export const generateCodeValidate = (req: Request, res: Response, next: NextFunction) => {

//     const { code } = req.body

//     if ( !code && (code as string).length != 5) throw new ValidationExcept("Formato de código inválido")

//     next() 

// }

export const generateCode = async (req: Request, res: Response) => {
    try {

        // gera codigo aleatório e grava no banco     

        const code = 12345

        // resposta
        if (code) res.status(StatusCodes.OK).json({message: "Codigo gerado com sucesso!"})
        else res.status(StatusCodes.BAD_REQUEST).json({message: "Falha ao gerar código de verificação"})

    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}