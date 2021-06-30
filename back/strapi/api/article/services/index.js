"use strict";

const { sanitizeEntity } = require("strapi-utils");

const recurseWalk = (obj, func) =>
  Object.keys(obj).reduce((obj, key) => {
    if (obj[key] && typeof obj[key] === "object") {
      recurseWalk(obj[key], func);
    } else {
      func(obj[key], key, obj);
    }

    return obj;
  }, obj);

const completeUrls = (article) => {
  const serverUrl = strapi.config.get("server.url");

  return recurseWalk(article, (value, key, obj) => {
    if (typeof value !== "string") return;

    obj[key] = value.replace(/(^|")\/uploads/g, `$1${serverUrl}/uploads`);
  });
};

// sanitize first-level text fields
const sanitizeTexts = (data) =>
  Object.keys(data).reduce((data, key) => {
    if (typeof data[key] === "string") {
      data[key] = data[key].trim().replace(/(\s)+/g, "$1");
    }

    return data;
  }, data);

const format = (article) => {
  // fixes weird empty object issue and GraphQL `cannot return null` error
  if (article.visuel && !article.visuel.url) {
    article.visuel.url = "";
  }

  return completeUrls(
    sanitizeEntity(article, { model: strapi.models.article })
  );
};

module.exports = {
  completeUrls,
  format,
  sanitizeTexts,
};
