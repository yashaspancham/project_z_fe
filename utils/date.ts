export const convertDateToMonthAndYear = (date: string | undefined): string => {
    if (!date) {
        return "N/A";
    }
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
};


export const convertDateToDayMonthYear = (date: string | undefined): string => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export const convertDateToFullString = (date: string | undefined): string => {
    if (!date) return "N/A";

    const d = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    };

    return d.toLocaleString("en-US", options);
};