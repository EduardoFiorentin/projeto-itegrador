import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";
import { schedulesQuery } from "../../queries";
import { DAYS_OF_WEEK } from "../../constants/Days";


export const getAllValidate = (req: Request, res: Response, next: NextFunction) => {
    // const { day, date } = req.body
    const role = req.user?.role

    if (role && (role != "3" && role != "2" && role != "1")) {
        res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
        return
    }
    else if (!role) {
        res.status(StatusCodes.BAD_REQUEST).send("Autenticação necessária!")
        return
    }

    // if (!date || !day) {
    //     res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
    //     return
    // }

    next()

    // verifica o formato
    
    // verificação de autorização 

}



export const getAll = async (req: Request, res: Response) => {
    try {

        // const {day, date} = req.body

        const modality = await database.many(`select name, code from modality;`)

        // const groupmodality = await database.many(modalityQuery.getByDate,[date, DAYS_OF_WEEK[day]])

        console.log("Response: ", modality)

        res.status(200).json(modality)
    }
    catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}