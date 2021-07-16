export const stringIsNotNullNorEmpty = (
  str: string | null | undefined
): boolean => {
  return str !== null && str !== undefined && str.length > 0;
};

export const stringArrayIsNullOrEmpty = (
  str: string[] | null | undefined
): boolean => {
  return str === null || str === undefined || str.length === 0;
};

export const validateEmail = (inputText: string): boolean => {
  const mailformat = /^[\w-.]+@([\w-]+\.)+[\w-]+$/;
  return mailformat.test(inputText);
};

export const validateFrenchPhoneNumber = (inputText: string): boolean => {
  const frenchPhoneFormat = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;
  return frenchPhoneFormat.test(inputText);
};
