"use strict";

const { attributes } = require("../models/article.settings");

const completeUrls = (article) => {
  const serverUrl = strapi.config.get("server.url");

  return JSON.parse(
    JSON.stringify(article, (key, value) =>
      typeof value === "string"
        ? value.replace(/\/uploads/g, `${serverUrl}/uploads`)
        : value
    )
  );
};

module.exports = { completeUrls };
