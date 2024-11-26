import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const getAllByDayValidate = (req: Request, res: Response, next: NextFunction) => {
    try {

        const day = req.params.day
        const role = req.user?.role
        
        if (role && (role != "1" && role != "2" && role != "3")) {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }

        if (!day) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        next()

    } 
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
} 

export const getAllByDay = async (req: Request, res: Response) => {
    try {

        const day = req.params.day
        
        const classes = await database.many(`
            SELECT gc.code, m.name as modality, up.name as teacher, dk.name as day, gc.starth, gc.endh
            FROM group_classes gc
            LEFT JOIN users up ON gc.teacher=up.cpf
            LEFT JOIN modality m ON gc.modality=m.code
            LEFT JOIN days_of_week dk on gc.wday=dk.code
            WHERE wday=$1 and canceled=false;
            `, [day])

        res.status(StatusCodes.OK).json(classes)

    } 
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
} 