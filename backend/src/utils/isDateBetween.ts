export function isDateBetween(targetDate: string, startDate: string, endDate: string) {
    const target = new Date(targetDate);
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(target.getTime()) || isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Uma ou mais datas são inválidas.");
    }

    return target >= start && target <= end;
}
