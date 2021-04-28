"use strict";

const { attributes } = require("../models/article.settings");

const completeUrls = async (article) => {
  const serverUrl = strapi.config.get("server.url");

  return Object.keys(attributes).reduce((article, key) => {
    if (attributes[key].type === "richtext") {
      article[key] = article[key].replace(/\/uploads/g, `${serverUrl}/uploads`);
    } else if (
      attributes[key].model === "file" &&
      article[key] &&
      article[key].url
    ) {
      article[key].url = `${serverUrl}${article[key].url}`;
    }

    return article;
  }, article);
};

module.exports = { completeUrls };
