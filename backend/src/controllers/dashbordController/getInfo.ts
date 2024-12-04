import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { database } from "../../services";
import { schedulesQuery } from "../../queries";
import { DAYS_OF_WEEK } from "../../constants/Days";
import { startTimer } from "winston";


export const getInfoValidate = (req: Request, res: Response, next: NextFunction) => {
    // const { day, date } = req.body
    const role = req.user?.role
    console.log("User : ", req.user)

    console.log("Role: ", role)

    if (role && ( role != "2" && role != "1")) {
        res.status(StatusCodes.BAD_REQUEST).send("Você não tem autorização para realizar esta operação!")
        return
    }
    else if (!role) {
        res.status(StatusCodes.BAD_REQUEST).send("Autenticação necessária!")
        return
    }

    next()

}



export const getInfo = async (req: Request, res: Response) => {
    try {

        const data: any = {}
         
        const today = new Date().toISOString().split("T")[0];

        // Substituir o valor da data diretamente na consulta ou usar um placeholder
        const personal_classes = await database.one(
            "SELECT COUNT(*) AS count FROM personal_classes WHERE cdate >= $1;",
            [today] // Passar a data formatada como parâmetro
        );
        data.personal_classes_count = personal_classes.count


        // numero de aulas em grupo por semana
        const group_classes = await database.one(
            "SELECT COUNT(*) AS count FROM group_classes;",
            [today] // Passar a data formatada como parâmetro
        );
        data.group_classes_count = group_classes.count


        // Lista de aulas do dia - personal + grupo
        const today_classes = await database.manyOrNone(
            `
            SELECT us1.name as teacher, gc.starth, gc.endh, m1.name as modality from group_classes gc
                join users us1 on gc.teacher=us1.cpf
                join modality m1 on gc.modality=m1.code
            where gc.wday = $1

            union 

            SELECT us2.name as teacher, starth, endh, m2.name as modality from personal_classes pc
                join users us2 on pc.teacher=us2.cpf
                join modality m2 on pc.modality=m2.code
            where cdate = $2;
            
            `, [new Date().getDay(), today] 
        );
        data.today_classes_list = today_classes

        const open_requests = await database.manyOrNone(
            `
            select u.name as student, m.name as modality
            from request_classes rc 
                join users u on rc.student_cpf=u.cpf
                join modality m on rc.modality=m.code
            where rc.status = 'pendent';
            `
        )

        data.open_requests = open_requests

        const today_access = await database.manyOrNone(`
            
            select  us.name, ah.granted, ah.descr, ah.dttime
            from access_hist ah join users us on ah.user_cpf=us.cpf
            where dttime::date = $1 order by ah.dttime desc;
            
        `, [today])

        
        data.today_accesses_list = today_access.map(item => ({
            ...item,
            dttime: new Date(item.dttime).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
        }));
        
        console.log(today_access)
        res.status(StatusCodes.OK).json(data)

    }
    catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Erro interno. Tente novamente mais tarde."})
    }
}