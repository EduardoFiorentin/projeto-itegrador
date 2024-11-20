import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

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

        const groupSchedules = await database.many(
            "SELECT s.starth, s.endh, gc.canceled, m.name AS modality_name, up.name AS teacher_name, COUNT(cs.student_cpf) AS num_participants FROM schedules s LEFT JOIN group_classes gc ON s.wday = gc.wday AND s.starth = gc.starth AND s.endh = gc.endh LEFT JOIN modality m ON gc.modality = m.code LEFT JOIN users up ON gc.teacher = up.cpf LEFT JOIN classes_student cs ON gc.code = cs.class_code AND cs.date = $1 WHERE s.wday = $2 GROUP BY s.starth, s.endh, gc.canceled, m.name, up.name ORDER BY s.starth;", 
            [date, days_of_w[day]])


        res.status(200).json(groupSchedules)
    }
    catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}