import { database } from "../services";
import { isDateBetween } from "./isDateBetween";

export async function getStudentActivePlan(cpf: string, date: string): Promise<{limit_acess: number, active: boolean}>  {

    try {
        const plan = await database.oneOrNone(`
            select user_cpf as cpf, wclasses as num_classes, up.cdate, up.expdate 
            from users_plans up join plans p on up.plancode=p.plancode
            where cdate=(
                select max(cdate) from (select * from users_plans where user_cpf=$1)
            ) 
            and up.expdate >= $2 
            and user_cpf=$1
            order by cdate;
        `, [cpf, date])

        // tem plano ativo e a data solicitada está dentro do limite 
        console.log("Plano: ", plan) 
        if (plan.length != 0 && isDateBetween(date, plan.cdate, plan.expdate)) {
            return {
                active: true,
                limit_acess: parseInt(plan.num_classes)
            }
        } 
        else {
            return {
                active: false,
                limit_acess: 0
            }
        }
    }
    catch (err) {
        console.log("Erro ao pegar plano", err)
        return {
            active: false,
            limit_acess: 0
        }
    } 


    

}