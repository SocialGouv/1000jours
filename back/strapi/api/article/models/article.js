"use strict";

const ModelsService = require("../../models/services");
const ArticleService = require("../services");

module.exports = {
  lifecycles: {
    afterFind: (articles) => articles.map(ArticleService.format),
    afterFindOne: ArticleService.format,
    beforeCreate: async (data) => ModelsService.sanitizeTexts(data),
    beforeUpdate: async (params, data) => ModelsService.sanitizeTexts(data),
  },
};
