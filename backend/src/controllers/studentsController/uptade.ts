import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";


function generateUpdateQueryAndValues(
    props: { name?: string; cpf?: string; email?: string; birth_date?: string; address?: string; phone_number?: string },
    cpf: string
  ) {
    const updateFields: string[] = [];
    const values: any[] = [];
    let index = 1; 
  
    if (props.name !== undefined) {
      updateFields.push(`name = $${index++}`);
      values.push(props.name);
    }
    if (props.cpf !== undefined) {
      updateFields.push(`cpf = $${index++}`);
      values.push(props.cpf);
    }
    if (props.email !== undefined) {
      updateFields.push(`email = $${index++}`);
      values.push(props.email);
    }
    if (props.birth_date !== undefined) {
      updateFields.push(`dtbirth = $${index++}`);
      values.push(props.birth_date);
    }
    if (props.address !== undefined) {
      updateFields.push(`address = $${index++}`);
      values.push(props.address);
    }
    if (props.phone_number !== undefined) {
      updateFields.push(`pnumber = $${index++}`);
      values.push(props.phone_number);
    }
  
    if (updateFields.length > 0) {
      const query = `UPDATE users SET ${updateFields.join(', ')} WHERE cpf = $${index}`;
      values.push(cpf);
      return { query, values };
    }
  
    return null; 
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
        ) {
            res.status(StatusCodes.BAD_REQUEST).send("Dados no formato incorreto!")
            return
        }

        next()

    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { cpf } = req.params;

        const updateData = generateUpdateQueryAndValues(body, cpf);

        if (updateData) {
            await database.none(updateData.query, updateData.values);
        }

        res.status(StatusCodes.OK).send("Usuário Atualizado!");
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Erro interno. Tente novamente mais tarde.");
    }
  };
  