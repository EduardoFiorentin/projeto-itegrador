import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const deleteStudentValidate = (req: Request, res: Response, next: NextFunction,) => {
    try {

        const { cpf } = req.body
        const role = req.user?.role
        
        if (role && role != "1") {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }
        
        if (
            !cpf 

        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        next()

    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    try {

        const { cpf } = req.body

        await database.none(`
                DELETE FROM users WHERE cpf=$1;
            `, [cpf])

        res.status(StatusCodes.CREATED).send("Usuário deletado com sucesso!")

    }
    catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}