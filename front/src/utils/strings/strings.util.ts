// Il y a un souci de compatibilité avec le String.replaceAll, il faut donc utiliser la méthode split
export const replaceAllText = (
  originalString: string,
  search: RegExp | string,
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

export const isNotNullNorEmpty = (str: string | null | undefined): boolean =>
  str !== null && str !== undefined && str.length > 0;

export const isStringArrayNullOrEmpty = (
  str: string[] | null | undefined
): boolean => str === null || str === undefined || str.length === 0;

export const areArraysTheSameInContentAndLength = (
  firstArray: string[],
  secondArray: string[]
): boolean =>
  firstArray.length === secondArray.length &&
  firstArray.every((firstArrayElement) =>
    secondArray.includes(firstArrayElement)
  );

export const isValidEmail = (inputText: string): boolean => {
  const mailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]+$/;
  return mailFormat.test(inputText);
};

export const isValidFrenchPhoneNumber = (phoneNumber: string): boolean => {
  const frenchPhoneFormat = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;
  return frenchPhoneFormat.test(phoneNumber);
};

export const formatPhoneNumber = (phoneNumber: string): string => {
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

/**
 * Rajoute un "." si le texte se termine par ".", "?" ou "!"
 * @param text
 */
export const addEndDotIfNeeded = (text: string): string => {
  const regexp = new RegExp("[.?!]$");
  return regexp.exec(text) ? `${text}` : `${text}.`;
};

/**
 * Rajoute un " " entre un point et une majuscule
 * @param text
 */
export const addSpaceBetweenDotAndUppercase = (text: string): string => {
  return text.replace(/([.])([A-Z])/g, "$1 $2").trim();
};
