import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const getAllValidate = (req: Request, res: Response, next: NextFunction) => {
    try {

        const role = req.user?.role
        
        if (role && (role != "1" && role != "2")) {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }

        next()

    } 
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
} 

export const getAll = async (req: Request, res: Response) => {
    try {

        const classes = await database.manyOrNone(`
            SELECT rc.status, su.name as student_name, tu.name as teacher_name, rc.data, dw.name as wday, rc.starth, rc.endh, m.name as modality
            FROM request_classes rc
            JOIN users su on rc.student_cpf=su.cpf
            JOIN users tu on rc.teacher_cpf=tu.cpf
            JOIN days_of_week dw on rc.wday=dw.code
            JOIN modality m on m.code=rc.modality
            where rc.status = 'pendent'
            order by data, starth
            ;
            `,)

            console.log("Classes: ", classes)
    
        res.status(StatusCodes.OK).json(classes)

    } 
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
} 