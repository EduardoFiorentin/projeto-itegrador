import { database } from "../services"
import {getWeekStartAndEnd} from './getWeekStartAndEnd'

export async function getClassesNumPerWeek(date: string, cpf: string): Promise<number> {
    
    try {
        // pega inicio e fim da semana
        const {weekStart, weekEnd} = getWeekStartAndEnd(date)
        console.log("Inicio e fim: ", weekStart, weekEnd)
    
        // verifica quantas aulas o usuário com cpf passado tem cadastradas neste período 
        // (solicitações de personal + aulas personais + inscrições em aulas em grupo)
        const num_classes = await database.one(`
            with personal_req as (
                select data as cdate, starth from request_classes where student_cpf=$1 and data >= $2 and data <= $3 and status = 'pendent'
            ),
            personal_classes as ( 
                select cdate, starth from personal_classes where student=$1 and cdate >= $2 and cdate <= $3
            ),
            group_subs as (
                select date as cdate, starth from classes_student where student_cpf=$1 and date >= $2 and date <= $3
            ),
            un as (
                select * from personal_req
                UNION
                select * from personal_classes
                UNION
                select * from group_subs
            )
            select count(*) from un; 
        `, [cpf, weekStart, weekEnd])

        console.log("Resposta do banco: ", num_classes)
        return parseInt(num_classes.count)

    }
    catch(err) {
        console.log("Erro na função de verificação de numero de aulas na semana: ", err)
        return -1
    }
} 