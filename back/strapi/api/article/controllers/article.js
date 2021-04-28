"use strict";

const ArticleService = require("../services");

const find = async (ctx) => {
  let articles;

  if (ctx.query._q) {
    articles = await strapi.query("article").search(ctx.query);
  } else {
    articles = await strapi.query("article").find(ctx.query);
  }

  return articles.map(ArticleService.completeUrls);
};

const findOne = async (ctx) => {
  const { id } = ctx.params;

  const article = await strapi.query("article").findOne({ id });

  return ArticleService.completeUrls(article);
};

module.exports = {
  find,
  findOne,
};
