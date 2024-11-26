import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const deleteRequestClassValidate = (req: Request, res: Response, next: NextFunction) => {
    try {

        const { wday, starth, endh, date } = req.body
        const role = req.user?.role
        
        if (role && (role != "1" && role != "3")) {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }


        if (
            !wday || !starth || !endh || !date

        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        next()

    } catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const deleteRequestClass = async (req: Request, res: Response) => {
    try {

        const { wday, starth, endh, date } = req.body

        await database.none(`
                DELETE FROM request_classes WHERE wday=$1 and starth=$2 and endh=$3 and data=$4;
            `, [wday, starth, endh, date])

        res.status(StatusCodes.CREATED).send("Solicitação deletada com sucesso!")

    }
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}