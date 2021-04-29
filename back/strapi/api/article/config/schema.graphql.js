"use strict";

const ArticleController = require("../controllers/article");
const ArticleService = require("../services");

const getArticlesResolver = async (_1, _2, { context }) =>
  await ArticleController.find(context);

const getArticleResolver = async (_1, _2, { context }) =>
  await ArticleController.findOne(context);

module.exports = {
  resolver: {
    Query: {
      articles: {
        description: "Retourne une liste d'articles",
        resolver: getArticlesResolver,
        resolverOf: "application::article.article.find",
      },
      article: {
        description: "Retourne un article",
        resolver: getArticleResolver,
        resolverOf: "application::article.article.findOne",
      },
    },
  },
};
