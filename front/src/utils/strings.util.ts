// Il y a un souci de compatibilité avec le String.replaceAll, il faut donc utiliser la méthode split
export const replaceAllText = (
  originalString: string,
  search: string,
  replace: string
): string => {
  return originalString.split(search).join(replace);
};

export const removeListHyphens = (text: string | undefined): string => {
  if (text) {
    text = replaceAllText(text, "\n-", "\n");
    if (text.startsWith("-")) text = text.substring(1);
  }
  return text ?? "";
};

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

export const arraysHaveSameLengthAndContainSameValues = (
  firstArray: string[],
  secondArray: string[]
): boolean => {
  return (
    firstArray.length === secondArray.length &&
    firstArray.every((firstArrayElement) =>
      secondArray.includes(firstArrayElement)
    )
  );
};

export const validateEmail = (inputText: string): boolean => {
  const mailformat = /^[\w-.]+@([\w-]+\.)+[\w-]+$/;
  return mailformat.test(inputText);
};

export const validateFrenchPhoneNumber = (inputText: string): boolean => {
  const frenchPhoneFormat = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;
  return frenchPhoneFormat.test(inputText);
};

export const phoneNumberFormattingForElise = (phoneNumber: string): string => {
  const regexSeparateEveryTwo = /(.{2})(?!$)/g;
  if (phoneNumber.length === 10)
    return phoneNumber.replace(regexSeparateEveryTwo, "$1 ");
  else {
    const numberWithAreaCode = phoneNumber.replace(/^(0033)/g, "+33");
    if (numberWithAreaCode.startsWith("+")) {
      const simpleFormatting = numberWithAreaCode
        .slice(4)
        .replace(regexSeparateEveryTwo, "$1 ");
      return `${numberWithAreaCode.slice(0, 3)} ${numberWithAreaCode.slice(
        3,
        4
      )} ${simpleFormatting}`;
    }
  }

  return phoneNumber;
};
