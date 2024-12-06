import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const getFreeTeachersByDateValidate = (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role

    if (role && (role != "3" && role != "2" && role != "1")) {
        res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
        return
    }
    else if (!role) {
        res.status(StatusCodes.BAD_REQUEST).send("Autenticação necessária!")
        return
    }

    next()
}

export const getFreeTeachersByDate = async(req: Request, res: Response) => {

    try {

        const teachers = await database.manyOrNone(`
            select name from users where role=2;
            `)


        res.status(200).json(teachers)
    }
    catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }

}