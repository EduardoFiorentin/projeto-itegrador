export function isValidFutureDate(dateString: string) {

    const dateRegex = /^2\d{3}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
        return false;
    }

    const inputDate = new Date(dateString);


    if (isNaN(inputDate.getTime())) {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today;
}

