import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";
import { schedulesQuery } from "../../queries";

const days_of_w = {
    "Segunda-feira": 1,
    "Terça-feira": 2,
    "Quarta-feira": 3,
    "Quinta-feira": 4,
    "Sexta-feira": 5,
    "Sábado": 5,
    "Domingo": 5
}

export const getAllByDay = async (req: Request, res: Response) => {
    try {

        const {day, date} = req.body

        console.log("Dia: ", days_of_w[day])

        const groupSchedules = await database.many(schedulesQuery.getByDate,[date, days_of_w[day]])


        res.status(200).json(groupSchedules)
    }
    catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}