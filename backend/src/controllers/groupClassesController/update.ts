import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

function generateUpdateQueryAndValues(
    props: { modality?: string; teacher_cpf?: string; wday?: string; starth?: string; endh?: string; canceled?: boolean },
    code: string
  ) {
    const updateFields: string[] = [];
    const values: any[] = [];
    let index = 1; 
  
    if (props.modality !== undefined) {
      updateFields.push(`modality = $${index++}`);
      values.push(props.modality);
    }
    if (props.teacher_cpf !== undefined) {
      updateFields.push(`teacher = $${index++}`);
      values.push(props.teacher_cpf);
    }
    if (props.wday !== undefined) {
      updateFields.push(`wday = $${index++}`);
      values.push(props.wday);
    }
    if (props.starth !== undefined) {
      updateFields.push(`starth = $${index++}`);
      values.push(props.starth);
    }
    if (props.endh !== undefined) {
      updateFields.push(`endh = $${index++}`);
      values.push(props.endh);
    }
    if (props.canceled !== undefined) {
      updateFields.push(`canceled = $${index++}`);
      values.push(props.canceled);
    }
  
    if (updateFields.length > 0) {
      const query = `UPDATE group_classes SET ${updateFields.join(', ')} WHERE code = $${index}`;
      values.push(code);
      return { query, values };
    }
  
    return null;
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}

export const updateGroupClass = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const { code } = req.params;
  
      // Troca nome do professor pelo CPF
      if (body.teacher_name) {
        const teacher = await database.oneOrNone("SELECT cpf FROM users WHERE name = $1", [body.teacher_name]);
  
        if (teacher) {
          body.teacher_cpf = teacher.cpf;
        } else {
          res.status(StatusCodes.BAD_REQUEST).send("Professor com nome fornecido não encontrado!");
          return;
        }
      }
  
      // Gera query
      const updateData = generateUpdateQueryAndValues(body, code);

      if (updateData) {
        await database.none(updateData.query, updateData.values);
      }
  
      res.status(StatusCodes.OK).send("Aula Atualizada!");
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Erro interno. Tente novamente mais tarde.");
    }
  };
  