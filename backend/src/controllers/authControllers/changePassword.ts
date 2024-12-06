import { NextFunction, Request, Response } from "express";
import {StatusCodes} from "http-status-codes"
import { MailService } from "../../services";
import { JwtService } from "../../services";

// Altera a senha do usuário

export const changePasswordValidate = (req: Request, res: Response, next: NextFunction) => {

    const { newPassword } = req.body

    if ( !newPassword) 
        res.status(StatusCodes.BAD_REQUEST).json({error: "Formato da nova senha é inválido!"})

    else next() 

}

export const changePassword = async (req: Request, res: Response) => {
    try {

        // receber request 
        const { newPassword } = req.body
        
        // alteração no banco 

        // resposta
        res.status(StatusCodes.OK).json({message: "Codigo verificado com sucesso!", token: "dadfrgadfrgwsefwewg"})
        res.status(StatusCodes.BAD_REQUEST).json({message: "Codigo inválido!"})

    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}