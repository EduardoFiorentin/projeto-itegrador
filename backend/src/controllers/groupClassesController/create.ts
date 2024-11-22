import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";
import { start } from "repl";

export const createGroupClassesValidate = async (req: Request, res: Response, next: NextFunction,) => {
    try {

        const { modality, teacher_name, wday, starth, endh } = req.body
        const role = req.user?.role
        
        // verificação de autorização 
        if (role && role != "1") {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }
        
        // Verificação do nome do professor
        const teacher = await database.oneOrNone("SELECT cpf FROM users WHERE name = $1;", [teacher_name])
        if (!teacher) {
            res.status(StatusCodes.BAD_REQUEST).send("Professor não encontrado!")
            return
        } 

        req.body.teacher_cpf = teacher.cpf

        // Verificação dos dados passados 
        if (
            !modality || !teacher_name || !wday || !starth || !endh 

        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        // Verificação de liberação do horario
        const g_class = await database.oneOrNone("SELECT * FROM group_classes WHERE wday=$1 and starth=$2 and endh=$3;", 
            [wday, starth, endh]
        )

        if (g_class) {
            res.status(StatusCodes.BAD_REQUEST).send("Horário não disponível!")
            return
        }

        next()

    } catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const createGroupClasses = async (req: Request, res: Response) => {
    try {

        const { modality, teacher_cpf, wday, starth, endh } = req.body

        await database.none(`
                INSERT INTO group_classes (canceled, modality, teacher, wday, starth, endh) 
                VALUES ($1, $2, $3, $4, $5, $6);
            `, [false, parseInt(modality), teacher_cpf, wday, starth, endh])

        res.status(StatusCodes.CREATED).send("Aula cadastrada com sucesso!")

    }
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}