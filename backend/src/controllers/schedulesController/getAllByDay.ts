import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";
import { schedulesQuery } from "../../queries";
import { DAYS_OF_WEEK } from "../../constants/Days";

export const getAllByDay = async (req: Request, res: Response) => {
    try {

        const {day, date} = req.body
        const groupSchedules = await database.many(schedulesQuery.getByDate,[date, DAYS_OF_WEEK[day]])

        res.status(200).json(groupSchedules)
    }
    catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}