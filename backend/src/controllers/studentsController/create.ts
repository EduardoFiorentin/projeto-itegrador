import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const createStudentValidate = (req: Request, res: Response, next: NextFunction,) => {
    try {

        const { name, cpf, email, password, birth_date, address, phone_number } = req.body
        const role = req.user?.role
        
        if (role && role != "1") {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }
        
        if (
            !name || !cpf || !email || !password || !birth_date || !address || !phone_number ||
            cpf.length != 11

        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        next()

    } catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const createStudent = async (req: Request, res: Response) => {
    try {

        const { name, cpf, email, password, birth_date, address, phone_number } = req.body

        await database.none(`
                INSERT INTO users (name, cpf, email, password, role, dtbirth, address, pnumber) 
                VALUES ($1, $2, $3, $4, 3, $5, $6, $7);
            `, [name, cpf, email, password, birth_date, address, phone_number])

        res.status(StatusCodes.CREATED).send("Usuário criado com sucesso!")

    }
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}