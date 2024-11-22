import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

function generateUpdateQuery(props: {name?: string, cpf?: string, email?: string, birth_date?: string, address?: string, phone_number?: string}, cpf: string) {
    let updateFields: string[] = [];
    console.log("Data: ", props)
    if (props.hasOwnProperty('name')) {
        if (props.name !== undefined) updateFields.push(`name = '${props.name}'`);
    }
    if (props.hasOwnProperty('cpf')) {
        if (props.cpf !== undefined) updateFields.push(`cpf = '${props.cpf}'`);
    }
    if (props.hasOwnProperty('email')) {
        if (props.email !== undefined) updateFields.push(`email = '${props.email}'`);
    }
    if (props.hasOwnProperty('birth_date')) {
        if (props.birth_date !== undefined) updateFields.push(`dtbirth = '${props.birth_date}'`);
    }
    if (props.hasOwnProperty('address')) {
        if (props.address !== undefined) updateFields.push(`address = '${props.address}'`);
    }
    if (props.hasOwnProperty('phone_number')) {
        if (props.phone_number !== undefined) updateFields.push(`pnumber = '${props.phone_number}'`);
    }

    if (updateFields.length > 0) {
        const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE cpf = '${cpf}';`;
        return updateQuery;

    } else {
        return null; 
    }
}

export const updateStudentValidate = (req: Request, res: Response, next: NextFunction,) => {
    try {

        const { cpf } = req.params
        const role = req.user?.role
        
        if (role && role != "1") {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }
        
        if (
            !cpf 
            // cpf.length != 11

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

export const updateStudent = async (req: Request, res: Response) => {
    try {

        const body = req.body 
        const {cpf} = req.params

        const query = generateUpdateQuery(body, cpf)
        console.log(query)
        if (query) await database.none(query)

        res.status(StatusCodes.OK).send("Usuário Atualizado!")

    }
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}