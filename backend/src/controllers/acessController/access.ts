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
        const user = await database.oneOrNone("SELECT cpf, role FROM users WHERE accesscode = $1;", [code])
        if (!user) {
            res.status(StatusCodes.BAD_REQUEST).send()
            return
        } 
        req.body.cpf = user.cpf
        req.body.role = user.role
        console.log("Aluno encontrado: ", user.cpf)

        next()

    } catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const access = async (req: Request, res: Response) => {
    try {

        const { cpf, role } = req.body
        


        console.log("Procurando")


        // Verificar se o aluno tem acesso - apenas em dias com aulas agendadas + plano ativo 
        if (role == "3") {
            const today = new Date().toISOString().split("T")[0] 

            // plano ativo no dia do acesso 
            const plans = await database.one(`
                    select count(*) from users_plans where user_cpf = $2 and cdate <= $1 and expdate >= $1;
                `,[today, cpf])

            console.log("count  ", plans)

            if (plans.count === '0') {
                // Registra tentativa
                await database.none(`
                    INSERT INTO access_hist (user_cpf, granted, descr) VALUES ($1, $2, $3);
                `, [cpf, false, `Aluno não possui plano ativo em ${today}.`])

                res.status(StatusCodes.BAD_REQUEST).send()
                return
            }
            
            // aula agendada para o dia do acesso 
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
    
            `, [today, cpf])
    
            if (classes.count === '0' && role === 3) {

                // Registra tentativa
                await database.none(`
                    INSERT INTO access_hist (user_cpf, granted, descr) VALUES ($1, $2, $3);
                `, [cpf, false, `Aluno não tem aulas agendadas para ${today}.`])

                res.status(StatusCodes.BAD_REQUEST).send()
                return
            }
            
            // MARCAR PRESENÇA DO ALUNO 
            await database.none(`UPDATE classes_student SET present=true WHERE date=$1 AND student_cpf=$2`, [today, cpf])
            await database.none(`UPDATE personal_classes SET present=true WHERE cdate=$1 AND student=$2`, [today, cpf])
        }


        await database.none(`
            INSERT INTO access_hist (user_cpf, granted, descr) VALUES ($1, $2, $3);
        `, [cpf, true, null])
        
        res.status(StatusCodes.OK).send()

    }
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}