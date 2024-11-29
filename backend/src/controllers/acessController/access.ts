import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const accessValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { code } = req.body

        // Verificação dos dados passados 
        if (
            !code 

        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        // pegar informações do usuário
        const student = await database.oneOrNone("SELECT cpf, role FROM users WHERE accesscode = $1;", [code])
        if (!student) {
            res.status(StatusCodes.BAD_REQUEST).send()
            return
        } 
        req.body.cpf = student.cpf
        console.log("Aluno encontrado: ", student.cpf)

        // verificar se o usuário tem aula hoje 

        const today = new Date().toISOString().split("T")[0] 

        const classes = await database.oneOrNone(`
            
            WITH personal AS (
                SELECT student AS cpf 
                FROM personal_classes 
                WHERE cdate = $1 AND student = $2
            ),
            group_classes AS (
                SELECT student_cpf AS cpf 
                FROM classes_student 
                WHERE student_cpf = $2 AND date = $1
            ),
            un AS (
                SELECT * FROM personal
                UNION
                SELECT * FROM group_classes
            )
            SELECT COUNT(*) 
            FROM un;

        `, [today, student.cpf])

        console.log("Encontrado: ", classes, student.role)
        
        if (classes.count === '0' && student.role === 3) {
            res.status(StatusCodes.BAD_REQUEST).send()
            return
        }

        next()

    } catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const access = async (req: Request, res: Response) => {
    try {

        const { cpf } = req.body
        


        console.log("Procurando")

        await database.none(`
                INSERT INTO access_hist (cpf) VALUES ($1);
            `, [cpf])

        res.status(StatusCodes.OK).send()

    }
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}