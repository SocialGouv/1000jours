"use strict";

const ArticleModel = require("../models/article.settings.js");
const ModelsService = require("../../models/services");

const normalizeString = (str) =>
  str
    ? str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    : "";

const format = (entity) => {
  // fixes weird empty object issue and GraphQL `cannot return null` error
  if (entity.visuel && !entity.visuel.url) {
    entity.visuel.url = "";
  }

  return ModelsService.format(entity, "article");
};

const ArticleTextFields = Object.keys(ArticleModel.attributes).filter(
  (field) =>
    ["text", "richtext", "string"].indexOf(
      ArticleModel.attributes[field].type
    ) !== -1
);

const search = async ({ query }) => {
  query = normalizeString(query);

  const articles = await strapi
    .query("article")
    .find({ published_at_null: false });

  if (!articles.length) return [];

  return articles.filter((article) =>
    ArticleTextFields.some((field) =>
      normalizeString(article[field]).match(query)
    )
  );
};

module.exports = {
  ...ModelsService,
  search,
  format,
};
