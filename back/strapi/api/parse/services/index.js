const toArray = (obj) => (!Array.isArray(obj) ? [obj] : obj);

const getValueDot = (obj, key) =>
  key.split(".").reduce((obj, key) => obj && obj[key], obj);

const getValue = (obj, key, fileType) =>
  fileType === "json" ? getValueDot(obj, key) : obj[key];

const checkConditions = (conditions, line, fileType = "csv") =>
  conditions.every(
    ({ condition_source, condition_valeur }) =>
      // TODO: demander si besoin de règles de parsing dans les conditions ?
      // ex : processValue(condition_source, line, fileType)
      getValue(line, condition_source, fileType) === condition_valeur
  );

const processValue = (valeur, line, fileType = "csv") => {
  let isNumber = false;
  let value;

  if (valeur[0] === '"') {
    value = valeur.slice(1, valeur.length - 1);
  } else if (valeur[0] === "+") {
    isNumber = true;
    valeur = valeur.slice(1);
  } else if (valeur[0] === "/") {
    let [, key, regExp] = valeur.split("/");

    const reg = new RegExp(regExp);

    const lineValue = getValue(line, key, fileType);
    if (lineValue) {
      const match = lineValue.match(reg);

      if (match && match[1]) {
        value = match[1];
      }
    }
  } else if (valeur.match(/\${[^]+}/)) {
    value = valeur.replace(/\${[^}]+}/g, (m) => {
      const key = m.slice(2, m.length - 1);

      // TODO: refaire un processValue si regexp dans ${...}
      return getValue(line, key, fileType) || "";
    });
  } else {
    value = getValue(line, valeur, fileType);
  }

  if (Array.isArray(value)) {
    value = value.join(" ");
  }

  if (typeof value === "string") {
    value = value.trim().replace(/\s+/g, " ");
  }

  if (isNumber) {
    value += value | 0;
  }

  return value;
};

const processRegles = (keyRegles, line, fileType = "csv") => {
  let value;

  for (const keyRegle of keyRegles) {
    const { valeur, conditions } = keyRegle;

    if (
      valeur &&
      (!conditions || checkConditions(conditions.conditions, line, fileType))
    ) {
      value = processValue(valeur, line, fileType);

      if (value !== undefined) break;
    }
  }

  return value;
};

const parseLine = (regles, line, fileType = "csv") => {
  const data = {};

  for (const key of Object.keys(regles)) {
    if (key === "id" || !regles[key] || !regles[key].length) continue;

    data[key] = processRegles(regles[key], line, fileType);
  }

  return data;
};

module.exports = { parseLine };
