"use strict";

const { sanitizeEntity } = require("strapi-utils");

const recurseWalk = (obj, func) =>
  Object.keys(obj).reduce((allObj, key) => {
    if (allObj[key] && typeof allObj[key] === "object") {
      recurseWalk(allObj[key], func);
    } else {
      func(allObj[key], key, allObj);
    }

    return allObj;
  }, obj);

const completeUrls = (entity) => {
  const serverUrl = strapi.config.get("server.url");

  return recurseWalk(entity, (value, key, someEntity) => {
    if (typeof value !== "string") return someEntity;

    someEntity[key] = value.replace(/(^|")\/uploads/g, `$1${serverUrl}/uploads`);

    return someEntity;
  });
};

// sanitize first-level text fields
const sanitizeTexts = (data) =>
  Object.keys(data).reduce((allData, key) => {
    if (typeof allData[key] === "string") {
      allData[key] = allData[key].trim().replace(/(\s)+/g, "$1");
    }

    return allData;
  }, data);

const format = (entity, modelName) => {
  if (!strapi.models[modelName]) {
    throw new Error(`Modèle ${modelName} inexistant`);
  }

  return sanitizeEntity(completeUrls(entity), {
    model: strapi.models[modelName],
  });
};

module.exports = {
  completeUrls,
  format,
  sanitizeTexts,
};
