export const addDays = (date: Date, days: number): Date => {
  date.setDate(date.getDate() + days);
  return date;
};
