import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const createRequestClassValidate = async (req: Request, res: Response, next: NextFunction,) => {
    try {

        const { modality, teacher_name, student_name, wday, starth, endh, date } = req.body
        const role = req.user?.role
        
        // verificação de autorização 
        if (role && (role != "3" && role != "1")) {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }
        
        // Verificação dos dados passados 
        if (
            !modality || !teacher_name || !wday || !starth || !endh || !date

        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        // Verificação do nome do professor
        const teacher = await database.oneOrNone("SELECT cpf FROM users WHERE name = $1;", [teacher_name])
        if (!teacher) {
            res.status(StatusCodes.BAD_REQUEST).send("Professor não encontrado!")
            return
        } 

        req.body.teacher_cpf = teacher.cpf

        // Verificação do nome do student
        const student = await database.oneOrNone("SELECT cpf FROM users WHERE name = $1;", [student_name])
        if (!student) {
            res.status(StatusCodes.BAD_REQUEST).send("Aluno não encontrado!")
            return
        } 

        req.body.student_cpf = student.cpf


        // Verificação de liberação do horario
        const group_class = await database.oneOrNone("SELECT wday FROM group_classes WHERE wday=$1 and starth=$2 and endh=$3;", 
            [wday, starth, endh]
        )
        const personal_class = await database.oneOrNone("SELECT wday FROM personal_classes WHERE wday=$1 and starth=$2 and endh=$3 and cdate=$4;", 
            [wday, starth, endh, date]
        )
        
        const request_class = await database.oneOrNone("SELECT wday FROM request_classes WHERE wday=$1 and starth=$2 and endh=$3 and status != 'rejected' and data=$4;", 
            [wday, starth, endh, date]
        )

        if (group_class || personal_class || request_class) {
            res.status(StatusCodes.BAD_REQUEST).send("Horário não disponível!")
            return
        }

        next()

    } catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const createRequestClass = async (req: Request, res: Response) => {
    try {

        const { modality, teacher_cpf, student_cpf, wday, starth, endh, date } = req.body

        console.log(modality, teacher_cpf, student_cpf, wday, starth, endh)

        await database.none(`
                INSERT INTO request_classes (status, student_cpf, teacher_cpf, data, wday, starth, endh, modality) 
                VALUES ('pendent', $1, $2, $3, $4, $5, $6, $7);
            `, [student_cpf, teacher_cpf, date, wday, starth, endh, modality])

        res.status(StatusCodes.CREATED).send("Solicitação cadastrada com sucesso!")

    }
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}