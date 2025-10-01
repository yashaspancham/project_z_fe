export const convertDateToMonthAndYear = (date: string | undefined): string => {
    if (!date) {
        return "N/A";
    }
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
};

export const convertDateToFullString = (date: string | undefined): string => {
  if (!date) return "N/A";

  const d = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",    // e.g., Monday
    day: "numeric",     // e.g., 1
    month: "long",      // e.g., October
    year: "numeric",    // e.g., 2025
    hour: "numeric",    // e.g., 3 PM
    minute: "numeric",  // e.g., 45
    second: "numeric",  // optional, e.g., 30
    hour12: true,       // 12-hour format
  };

  return d.toLocaleString("en-US", options);
};