// Helper function to extract the month name from a date
export const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    return month.toUpperCase();
};