"use strict";

const ArticleService = require("../services");

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => ArticleService.sanitizeTexts(data),
    beforeUpdate: async (params, data) => ArticleService.sanitizeTexts(data),
    afterFind: (articles) => articles.map(ArticleService.format),
    afterFindOne: ArticleService.format,
  },
};
