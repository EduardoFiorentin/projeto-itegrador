import { Request, Response } from "express";
import {StatusCodes} from "http-status-codes"
import { MailService } from "../../services";
import { JwtService } from "../../services";


export const recoverPassword = async (req: Request, res: Response) => {
    try {

        // receber request 
        const { code } = req.body


        // autenticar codigo 
        const response = true

        // resposta
        if (response) res.status(StatusCodes.OK).json({message: "Codigo verificado com sucesso!", token: "dadfrgadfrgwsefwewg"})
        else res.status(StatusCodes.BAD_REQUEST).json({message: "Codigo inválido!"})

    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}