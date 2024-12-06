import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";
import { addMonthsToDate } from "../../utils/addMonthsToDate";

export const contractPlanValidate = async (req: Request, res: Response, next: NextFunction,) => {
    try {

        const { user_cpf, plan_code } = req.body
        const role = req.user?.role
        
        if (role && role != "1") {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }
        
        if (
            !user_cpf || !plan_code

        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        // consultar plano contratado 
        const plan = await database.oneOrNone(`
            select * from plans where plancode = $1;
        `, [plan_code])

        if (!plan) {
            res.status(StatusCodes.BAD_REQUEST).send("Plano não encontrado!")
            return
        }

        req.body.plan = plan

        // consultar usuário 
        const student = await database.oneOrNone("SELECT name FROM users WHERE cpf = $1;", [user_cpf])
        if (!student) {
            res.status(StatusCodes.BAD_REQUEST).send("Aluno não encontrado!")
            return
        } 
        
        // verificar se o usuário já tem planos contratados 
        const today = new Date().toISOString().split("T")[0]    
        const plan_student = await database.manyOrNone("SELECT * FROM users_plans WHERE user_cpf = $1 and expdate >= $2;", [user_cpf, today])
        if (plan_student.length !== 0) {
            res.status(StatusCodes.BAD_REQUEST).send("Aluno já possui um plano contratado!")
            return
        }

        next()

    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const contractPlan = async (req: Request, res: Response) => {
    try {

        const { user_cpf, plan_code, plan } = req.body
        const today = new Date().toISOString().split("T")[0]    
        const new_date = addMonthsToDate(today, parseInt(plan.months))

        await database.none(`
            insert into users_plans (plancode, user_cpf, cdate, expdate)
            values ($1, $2, $3, $4);
        `, [plan_code, user_cpf, today, new_date])

        res.status(StatusCodes.CREATED).send("Plano contratado com sucesso!")

    }
    catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}