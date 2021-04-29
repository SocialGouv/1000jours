"use strict";

const { sanitizeEntity } = require("strapi-utils");

const format = (article) =>
  ArticleService.completeUrls(
    sanitizeEntity(article, { model: strapi.models.article })
  );

const ArticleService = require("../services");

const find = async (context) => {
  let articles;

  if (context.query._q) {
    articles = await strapi.query("article").search(context.query);
  } else {
    articles = await strapi.query("article").find(context.query);
  }

  return articles.map(format);
};

const findOne = async (context) => {
  const { id } = context.params;

  const article = await strapi.query("article").findOne({ id });

  return format(article);
};

module.exports = {
  find,
  findOne,
};
