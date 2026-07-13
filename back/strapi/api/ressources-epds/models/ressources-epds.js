"use strict";

const RessourcesService = require("../services");

module.exports = {
  lifecycles: {
    afterFind: (ressourcess) => ressourcess.map(RessourcesService.format),
    afterFindOne: RessourcesService.format,
    beforeCreate: async (data) => RessourcesService.sanitizeTexts(data),
    beforeUpdate: async (params, data) => RessourcesService.sanitizeTexts(data),
  },
};
