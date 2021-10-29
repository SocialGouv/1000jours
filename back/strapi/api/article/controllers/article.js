"use strict";

const ArticleService = require("../services");

const find = async (context) => {
  let articles;

  const params = {
    ...context.query,
    published_at_null: false,
  };

  if (context.query._q) {
    articles = await strapi.query("article").search(params);
  } else {
    articles = await strapi.query("article").find(params);
  }

  return articles.map(ArticleService.format);
};

const findOne = async (context) => {
  const { id } = context.params;

  const article = await strapi.query("article").findOne({ id });

  return ArticleService.format(article);
};

module.exports = {
  find,
  findOne,
};
