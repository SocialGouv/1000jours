"use strict";

const ModelsService = require("../../models/services");
const ParenthequeDocumentService = require("../services");

module.exports = {
  lifecycles: {
    afterFind: (parenthequeDocuments) =>
      parenthequeDocuments.map(ParenthequeDocumentService.format),
    afterFindOne: ParenthequeDocumentService.format,
    beforeCreate: async (data) => ModelsService.sanitizeTexts(data),
    beforeUpdate: async (params, data) => ModelsService.sanitizeTexts(data),
  },
};
