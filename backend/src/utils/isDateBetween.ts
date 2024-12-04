export function isDateBetween(targetDate: string, startDate: string, endDate: string) {
    // Converte as strings para objetos Date
    const target = new Date(targetDate);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Verifica se as datas são válidas
    if (isNaN(target.getTime()) || isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Uma ou mais datas são inválidas.");
    }

    // Verifica se a data está no intervalo
    return target >= start && target <= end;
}
