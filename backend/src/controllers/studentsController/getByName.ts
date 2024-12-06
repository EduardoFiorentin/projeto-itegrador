import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const getStudentByNameValidate = (req: Request, res: Response, next: NextFunction,) => {
    try {

        const { name } = req.body
        const role = req.user?.role
        
        if (role && role != "1") {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }
        
        if (
            !name
        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        next()

    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const getStudentByName = async (req: Request, res: Response) => {
    try {

        const { name } = req.body

        const user = await database.oneOrNone(`
                SELECT name, cpf, email, dtbirth, address FROM users WHERE name like '%${name}%';
            `, [name])

        res.status(StatusCodes.CREATED).json(user)

    }
    catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}