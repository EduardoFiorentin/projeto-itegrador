import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";
import { schedulesQuery } from "../../queries";
import { DAYS_OF_WEEK } from "../../constants/Days";


export const getFreeSchedulesByDateValidate = (req: Request, res: Response, next: NextFunction) => {
    const { day, date } = req.body
    const role = req.user?.role

    if (role && (role != "3" && role != "2" && role != "1")) {
        res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
        return
    }
    else if (!role) {
        res.status(StatusCodes.BAD_REQUEST).send("Autenticação necessária!")
        return
    }

    if (!date || !day) {
        res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
        return
    }

    next()

    // verifica o formato
    
    // verificação de autorização 

}



export const getFreeSchedulesByDate = async (req: Request, res: Response) => {
    try {

        const {day, date} = req.body

        console.log("Data pesquisada: ", DAYS_OF_WEEK[day], date)

        const schedules = await database.many(`
            with 
            group_shedules_date as (select * from group_classes where wday=$1 and canceled=FALSE),
            personal_shedules_date as (select * from personal_classes where wday=$1 and cdate=$2),
            requests_schedules_date as (select * from request_classes where wday=$1 and data=$2)
            select s.starth, s.endh
            from schedules s
            left join group_shedules_date gc on s.wday=gc.wday and s.starth=gc.starth and s.endh=gc.endh
            left join personal_shedules_date pc on s.wday=pc.wday and s.starth=pc.starth and s.endh=pc.endh
            left join requests_schedules_date rc on s.wday = rc.wday and s.starth = rc.starth and s.endh = rc.endh
            where s.wday = $1 
            and gc.code is null and pc.cdate is null and rc.data is null
            order by s.starth;

            `,[DAYS_OF_WEEK[day], date])

        // const groupSchedules = await database.many(schedulesQuery.getByDate,[date, DAYS_OF_WEEK[day]])

        console.log("Response: ", schedules)

        res.status(200).json(schedules)
    }
    catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}