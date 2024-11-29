export function addMonthsToDate(dateString: string, monthsToAdd: number): string {
    const originalDate = new Date(dateString);

    if (isNaN(originalDate.getTime())) {
        throw new Error("Data inválida no formato yyyy-mm-dd.");
    }

    const year = parseInt(dateString.split("-")[0]);
    const month = parseInt(dateString.split("-")[1]);
    const day = parseInt(dateString.split("-")[2]);

    console.log("Ano original: ", year, month, day)

    const sum_month = month + monthsToAdd
    const new_month = sum_month % 12
    const add_year = Math.floor(sum_month / 12)

    console.log(sum_month, new_month, add_year)

    const final_year = (year + add_year).toString().padStart(2, "0");
    const final_month = new_month.toString().padStart(2, "0");

    return `${final_year}-${final_month}-${day}`;
}
