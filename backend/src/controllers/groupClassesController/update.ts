import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

function generateUpdateQuery(props: {modality?: string, teacher_cpf?: string, wday?: string, starth?: string, endh?: string, canceled?: boolean}, code: string) {
    let updateFields: string[] = [];
    console.log("Data: ", props)
    if (props.hasOwnProperty('modality')) {
        if (props.modality !== undefined) updateFields.push(`modality = '${props.modality}'`);
    }
    if (props.hasOwnProperty('teacher_cpf')) {
        if (props.teacher_cpf !== undefined) updateFields.push(`teacher = '${props.teacher_cpf}'`);
    }
    if (props.hasOwnProperty('wday')) {
        if (props.wday !== undefined) updateFields.push(`wday = '${props.wday}'`);
    }
    if (props.hasOwnProperty('starth')) {
        if (props.starth !== undefined) updateFields.push(`starth = '${props.starth}'`);
    }
    if (props.hasOwnProperty('endh')) {
        if (props.endh !== undefined) updateFields.push(`endh = '${props.endh}'`);
    }
    if (props.hasOwnProperty('canceled')) {
        if (props.canceled !== undefined) updateFields.push(`canceled = '${props.canceled}'`);
    }

    if (updateFields.length > 0) {
        const updateQuery = `UPDATE group_classes SET ${updateFields.join(', ')} WHERE code='${code}';`;
        return updateQuery;

    } else {
        return null; 
    }
}

export const updateGroupClassValidate = (req: Request, res: Response, next: NextFunction,) => {
    try {

        const { code } = req.params
        const role = req.user?.role
        
        if (role && role != "1") {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }
        
        if (
            !code 
        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Identificação de aula não informada!")
            return
        }

        next()

    } catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const updateGroupClass = async (req: Request, res: Response) => {
    try {

        const body = req.body 
        const {code} = req.params

        // troca nome do professor pelo cpf
        
        if (body.teacher_name) {
            const teacher = await database.oneOrNone("SELECT cpf FROM users WHERE name=$1;", [body.teacher_name])
    
            if (teacher) {
                body.teacher_cpf = teacher.cpf
            } 
            else {
                res.status(StatusCodes.BAD_REQUEST).send("Professor com nome fornecido não encontrado!")
                return
            }
        }

        const query = generateUpdateQuery(body, code)
        console.log(query)
        if (query) await database.none(query)

        res.status(StatusCodes.OK).send("Aula Atualizada!")

    }
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}