import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";
import { DAYS_OF_WEEK } from "../../constants/Days";

export const getAllValidate = (req: Request, res: Response, next: NextFunction) => {
    // const { day, date } = req.body
    const role = req.user?.role

    if (role && (role != "1")) {
        res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
        return
    }
    else if (!role) {
        res.status(StatusCodes.BAD_REQUEST).send("Autenticação necessária!")
        return
    }

    next()
}

export const getAll = async(req: Request, res: Response) => {

    try {

        const plans = await database.manyOrNone(`
            select * from plans;
        `)

        console.log("Response: ", plans)

        res.status(200).json(plans)
    }
    catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }

}