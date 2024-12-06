export const getByDate = `
SELECT r.wday, r.starth, r.endh, r.canceled, m.name as modality_name, r.teacher_name, r.student_name, r.num_participants from 
(SELECT 
    s.wday as wday, 
    s.starth as starth, 
    s.endh as endh,
    COALESCE(g.canceled, p.canceled) AS canceled,
    COALESCE(g.modality, p.modality) AS modality,
    COALESCE(u_g.name, u_p.name) AS teacher_name,
    CASE 
        WHEN g.code IS NOT NULL THEN NULL
        ELSE u_s.name
    END AS student_name,
    CASE 
        WHEN g.code IS NOT NULL THEN (
            SELECT COUNT(*) 
            FROM classes_student cs 
            WHERE cs.wday=g.wday and cs.starth=g.starth and cs.endh=g.endh AND cs.date = $1
        )
        ELSE NULL
    END AS num_participants
FROM 
    schedules s
LEFT JOIN group_classes g
    ON s.wday = g.wday AND s.starth = g.starth AND s.endh = g.endh
LEFT JOIN users u_g
    ON g.teacher = u_g.cpf
LEFT JOIN personal_classes p
    ON s.wday = p.wday AND s.starth = p.starth AND s.endh = p.endh AND p.cdate = $1
LEFT JOIN users u_p
    ON p.teacher = u_p.cpf
LEFT JOIN users u_s
    ON p.student = u_s.cpf
WHERE s.wday = $2
ORDER BY s.starth) r
LEFT JOIN modality m on r.modality = m.code
order by r.starth;

`
