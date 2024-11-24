import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

// não testado

export const createPersonalClassesValidate = async (req: Request, res: Response, next: NextFunction,) => {
    try {

        const { modality, teacher_name, wday, starth, endh, student_name, cdate } = req.body
        const role = req.user?.role
        
        // verificação de autorização 
        if (role && role != "1") {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }

        // Verificação dos dados passados 
        if (
            !modality || !teacher_name || !wday || !starth || !endh || !student_name || !cdate

        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        // Verificação de liberação do horario
        const g_class = await database.oneOrNone("SELECT * FROM group_classes WHERE wday=$1 and starth=$2 and endh=$3;", 
            [wday, starth, endh]
        )
        const p_class = await database.oneOrNone("SELECT * FROM personal_classes WHERE wday=$1 and starth=$2 and endh=$3;", 
            [wday, starth, endh]
        )

        if (g_class || p_class) {
            res.status(StatusCodes.BAD_REQUEST).send("Horário não disponível!")
            return
        }

        // Verificação do nome do professor
        const teacher = await database.oneOrNone("SELECT cpf FROM users WHERE name = $1;", [teacher_name])
        if (!teacher) {
            res.status(StatusCodes.BAD_REQUEST).send("Professor não encontrado!")
            return
        } 

        req.body.teacher_cpf = teacher.cpf


        // Verificação do nome do professor
        const student = await database.oneOrNone("SELECT cpf FROM users WHERE name = $1;", [student_name])
        if (!student) {
            res.status(StatusCodes.BAD_REQUEST).send("Aluno não encontrado!")
            return
        } 

        req.body.student_cpf = student.cpf

        next()

    } catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const createPersonalClasses = async (req: Request, res: Response) => {
    try {

        const { modality, teacher_cpf, wday, starth, endh, student_cpf, cdate } = req.body

        await database.none(`
                INSERT INTO personal_classes (canceled, modality, teacher, wday, starth, endh, student, cdate) 
                VALUES (false, $2, $3, $4, $5, $6, $7, $8);
            `, [false, parseInt(modality), teacher_cpf, wday, starth, endh, student_cpf, cdate])

        res.status(StatusCodes.CREATED).send("Aula cadastrada com sucesso!")

    }
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

