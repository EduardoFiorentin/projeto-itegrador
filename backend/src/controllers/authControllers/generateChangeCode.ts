import { Request, Response } from "express";
import {StatusCodes} from "http-status-codes"

export const generateCode = async (req: Request, res: Response) => {
    try {

        // gera codigo aleatório e grava no banco     

        const code = 12345

        // resposta
        if (code) res.status(StatusCodes.OK).json({message: "Codigo gerado com sucesso!"})
        else res.status(StatusCodes.BAD_REQUEST).json({message: "Falha ao gerar código de verificação"})

    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}