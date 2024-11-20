import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const createUser = (req: Request, res: Response) => {
    try {

        // const { name, cpf,  } = req.body

    }
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}