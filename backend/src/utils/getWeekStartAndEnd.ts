export function getWeekStartAndEnd(dateString: string): {weekStart: string, weekEnd: string} {
    const inputDate = new Date(dateString);

    const weekStart = new Date(inputDate);
    weekStart.setDate(inputDate.getDate() - inputDate.getDay());
    
    const weekEnd = new Date(inputDate);
    weekEnd.setDate(inputDate.getDate() + (6 - inputDate.getDay()));
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return {
        weekStart: formatDate(weekStart),
        weekEnd: formatDate(weekEnd),
    };
}