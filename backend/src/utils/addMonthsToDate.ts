export function addMonthsToDate(dateString: string, monthsToAdd: number): string {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
        throw new Error("Data inválida no formato yyyy-mm-dd.");
    }

    const newMonth = date.getMonth() + monthsToAdd;
    const newYear = date.getFullYear() + Math.floor(newMonth / 12);
    const adjustedMonth = newMonth % 12;

    const adjustedDate = new Date(newYear, adjustedMonth, day);

    if (adjustedDate.getMonth() !== adjustedMonth) {
        adjustedDate.setDate(0); 
    }

    const resultYear = adjustedDate.getFullYear();
    const resultMonth = String(adjustedDate.getMonth() + 1).padStart(2, "0");
    const resultDay = String(adjustedDate.getDate()).padStart(2, "0");

    return `${resultYear}-${resultMonth}-${resultDay}`;
}
