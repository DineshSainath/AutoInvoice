/**
 * Format a date string to YYYY-MM-DD format
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Get the first day of the next month
 */
export const getNextMonthDate = (date: Date): Date => {
  const nextMonth = new Date(date);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(1);
  return nextMonth;
};

/**
 * Format a date to a human-readable string
 */
export const formatDateHuman = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
