import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const CancelGrupeClassValidate = (req: Request, res: Response, next: NextFunction,) => {
    try {

        const { code } = req.body
        const role = req.user?.role
        
        if (role && role != "1") {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }
        
        if (
            !code 

        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        next()

    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const CancelGrupeClass = async (req: Request, res: Response) => {
    try {

        const { code } = req.body

        await database.none(`
                UPDATE group_classes SET canceled=true WHERE code=$1;
            `, [code])

        res.status(StatusCodes.CREATED).send("Aula cancelada com sucesso!")

    }
    catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}