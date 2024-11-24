import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";

export const handleValidate = (req: Request, res: Response, next: NextFunction) => {
    try {

        const { data, wday, starth, endh, change } = req.body

        if (!data || !wday || !starth || !endh || (change != "accepted" && change != "rejected")) {
            res.status(StatusCodes.BAD_REQUEST).send("Informações faltando!")
            return
        }
        
        const role = req.user?.role
        
        if (role && (role != "1" && role != "2")) {
            res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
            return
        }

        next()

    } 
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
} 

export const handle = async (req: Request, res: Response) => {
    try {

        const { data, wday, starth, endh, change } = req.body

        // const classes = await database.many(`
        //     SELECT rc.status, su.name as student_name, tu.name as teacher_name, rc.data, dw.name as wday, rc.starth, rc.endh, m.name as modality
        //     FROM request_classes rc
        //     JOIN users su on rc.student_cpf=su.cpf
        //     JOIN users tu on rc.teacher_cpf=tu.cpf
        //     JOIN days_of_week dw on rc.wday=dw.code
        //     JOIN modality m on m.code=rc.modality
        //     order by data, starth
        //     ;
        //     `,)

        const class_request = await database.oneOrNone(`
            SELECT modality, teacher_cpf, wday, starth, endh, student_cpf, TO_CHAR(data, 'YYYY-MM-DD') AS data
            FROM request_classes WHERE data=$1 and wday=$2 and starth=$3 and endh=$4;`, [data, wday, starth, endh])

        if (!class_request) {
            res.status(StatusCodes.BAD_REQUEST).send("Erro ao encontrar a solicitação.")
            return
        }

        await database.none(`
            UPDATE request_classes SET status = $1 where data=$2 and wday=$3 and starth=$4 and endh=$5;
            `, [change, data, wday, starth, endh])

        console.log("Verificação: ", class_request)
        

        if (change == "accepted") {
            await database.none(`
            INSERT INTO personal_classes (canceled, modality, teacher, wday, starth, endh, student, cdate) 
            VALUES (false, $1, $2, $3, $4, $5, $6, $7);  
            `, [class_request.modality, class_request.teacher_cpf, class_request.wday, class_request.starth, class_request.endh, class_request.student_cpf, class_request.data])
        }   


        res.status(StatusCodes.OK).json({})

    } 
    catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
} 

// {
//     status: 'accepted',
//     student_cpf: 'teste',
//     teacher_cpf: 'teste',
//     data: 2024-11-24T03:00:00.000Z,
//     wday: '3',
//     starth: '08:00:00',
//     endh: '08:59:00',
//     modality: '1'
//   }