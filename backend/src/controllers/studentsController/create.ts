import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";
import { addMonthsToDate } from "../../utils/addMonthsToDate";
import bcrypt from "bcrypt";


export const createStudentValidate = async (req: Request, res: Response, next: NextFunction,) => {
    try {

        const { name, cpf, email, password, birth_date, address, phone_number, plan_code, accesscode } = req.body
        const role = req.user?.role
        
        if (role && role != "1") {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }
        
        if (
            !name || !cpf || !email || !password || !birth_date || !address || !phone_number || !plan_code || !accesscode ||
            cpf.length != 11

        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        // pegar plano contratado 
        const plan = await database.oneOrNone(`
            select * from plans where plancode = $1;
        `, [plan_code])

        if (!plan) {
            res.status(StatusCodes.BAD_REQUEST).send("Plano não encontrado!")
            return
        }

        req.body.plan = plan

        next()

    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const createStudent = async (req: Request, res: Response) => {
    try {

        const { name, cpf, email, password, birth_date, address, phone_number, plan, accesscode } = req.body

        const salt = bcrypt.genSaltSync(10);
		const hashedPasswd = bcrypt.hashSync(password, salt);

        // cadastrar usuário 
        database.none("insert into users(name, cpf, email, password, role, dtbirth, address, pnumber, accesscode) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [name, cpf, email, hashedPasswd, 3, birth_date, address, phone_number, accesscode])


       
        // cadastrar plano contratado 
        const today = new Date().toISOString().split("T")[0]    

        const new_date = addMonthsToDate(today, parseInt(plan.months))

        await database.none(`
            insert into users_plans (plancode, user_cpf, cdate, expdate)
            values ($1, $2, $3, $4);
        `, [plan.plancode, cpf, today, new_date])


        res.status(StatusCodes.CREATED).send("Usuário criado com sucesso!")

    }
    catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}