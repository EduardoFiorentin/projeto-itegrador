import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";
import { getClassesNumPerWeek } from "../../utils/getClassesNumPerWeek";
import { getStudentActivePlan } from "../../utils/getStudentActivePlan";

export const subscribeValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { wday, starth, endh, student_email, date, present } = req.body
        const role = req.user?.role
        
        // verificação de autorização 
        if (role && (role != "1" && role != "2" && role != "3" )) {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }

        console.log("verificação do present: ", present, typeof present)

         // Verificação dos dados passados 
        if (
            !student_email || !date || !wday || !starth || !endh || (typeof present != "boolean")
        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }
        
        // Verificação do cpf do aluno
        const student = await database.oneOrNone("SELECT cpf FROM users WHERE email = $1;", [student_email])
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


export const subscribe = async (req: Request, res: Response) => {
    try {

        const { wday, starth, endh, student_cpf, date, present } = req.body
        const today = new Date().toISOString().split("T")[0] 

        // verifica se há um plano ativo e se a data solicitada está coberta por ele 
        const {active, limit_acess} = await getStudentActivePlan(student_cpf, date)

        if (!active) {
            res.status(StatusCodes.BAD_REQUEST).send("Data solicitada está fora do limite de um plano ativo.")
            return
        }

        // verifica se o limite de inscrições em aulas da semana não excede o limite 
        const num_classes = await getClassesNumPerWeek(date, student_cpf)

        console.log("Numero de classes: ", num_classes, limit_acess)

        // limit_acess == -1 -> numero livre de aulas 
        if (num_classes + 1 > limit_acess && limit_acess !== -1) {
            res.status(StatusCodes.BAD_REQUEST).send("Você atingiu o limite de aulas semanais!")
            return
        }

        await database.none(`
                INSERT INTO classes_student (wday, starth, endh, student_cpf, date, present) 
                VALUES ($1, $2, $3, $4, $5, $6);
            `, [wday, starth, endh, student_cpf, date, present])

        res.status(StatusCodes.CREATED).send("Inscrição realizada com sucesso!")

    }
    catch(err) {
        // if (err instanceof )
        const error = err as {code: string, details: string}

        console.log("Erro tratado", error)

        // 23505 - violação de unicidade na tabela de inscrição nas aulas 
        if (error.code == '23505') {
            res.status(StatusCodes.BAD_REQUEST).send("Não é possível se inscrever mais de uma vez na mesma aula!")
            return
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Erro interno. Tente novamente mais tarde.")
    }
} 