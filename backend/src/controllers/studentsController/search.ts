import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const searchValidate = (req: Request, res: Response, next: NextFunction) => {
    try {

        const { search } = req.body
        const role = req.user?.role
        
        if (role && role != "1") {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }
        
        if (
            !search
        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        next()

    }
    catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const search = async (req: Request, res: Response) => {
    try {

        const { search } = req.body

        const user = await database.manyOrNone(`
                SELECT name, cpf, email, address, pnumber FROM users WHERE 
                name ilike $1 or cpf ilike $1 or email ilike $1 and role=3;
            `, [`${search}%`, search])

        res.status(StatusCodes.OK).json(user)

    }
    catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}