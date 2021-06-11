const getValueDot = (obj, key) =>
  key.split(".").reduce((obj, key) => obj && obj[key], obj);

const getValue = (obj, key, fileType) =>
  fileType === "json" ? getValueDot(obj, key) : obj[key];

const checkConditions = (line, conditions, fileType = "csv") =>
  conditions.every(({ condition_source, condition_valeur }) => {
    const value = getValue(line, condition_source, fileType);

    // if condition_valeur is empty
    // then, value should be empty too
    if (!condition_valeur) return !value;

    if (condition_valeur[0] === "/") {
      return new RegExp(
        condition_valeur.slice(1, condition_valeur.length - 1)
      ).test(value);
    }

    return value === condition_valeur;
  });

const processValue = (line, valeur, fileType = "csv") => {
  let isNumber = false;
  let value;

  if (valeur[0] === '"') {
    value = valeur.slice(1, valeur.length - 1);
  } else if (valeur[0] === "+") {
    isNumber = true;
    valeur = valeur.slice(1);
  } else if (valeur[0] === "/") {
    const [, key, regExp] = valeur.split("/");

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

      return processValue(line, key, fileType) || "";
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

const processRegles = (line, key, keyRegles, fileType = "csv") => {
  let value;

  for (const keyRegle of keyRegles) {
    const { conditions } = keyRegle;
    let { valeur } = keyRegle;

    if (key === "type") {
      // get cartographie-type id value
      valeur = `"${valeur.id}"`;
    }

    if (
      valeur &&
      (!conditions || checkConditions(line, conditions, fileType))
    ) {
      value = processValue(line, valeur, fileType);

      if (value !== undefined) break;
    }
  }

  return value;
};

const parseLine = (line, regles, fileType = "csv") => {
  const data = {};

  for (const key of Object.keys(regles)) {
    if (key === "id" || !regles[key] || !regles[key].length) continue;

    data[key] = processRegles(line, key, regles[key], fileType);
  }

  return data;
};

module.exports = { parseLine };
