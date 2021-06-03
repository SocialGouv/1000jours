export const stringIsNotNullNorEmpty = (
  str: string | null | undefined
): boolean => {
  return str !== null && str !== undefined && str.length > 0;
};
