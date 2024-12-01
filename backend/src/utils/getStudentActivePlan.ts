import { database } from "../services";

export async function getStudentActivePlan(cpf: string, today: string): Promise<{limit_acess: number, active: boolean}>  {

    try {
        const plan = await database.oneOrNone(`
            select user_cpf as cpf, wclasses as num_classes, up.cdate, up.expdate 
            from users_plans up join plans p on up.plancode=p.plancode
            where cdate=(
                select max(cdate) from (select * from users_plans where user_cpf=$1)
            ) 
            and up.expdate >= $2;
        `, [cpf, today])
    
        if (plan) {
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

        console.log("Erro em: getStudentActivePlan > ", err)

        return {
            active: false,
            limit_acess: 0
        }
    }


    

}