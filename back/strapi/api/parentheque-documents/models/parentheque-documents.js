"use strict";

const ParenthequeDocumentService = require("../services");

module.exports = {
  lifecycles: {
    afterFind: (parenthequeDocuments) =>
      parenthequeDocuments.map(ParenthequeDocumentService.format),
    afterFindOne: ParenthequeDocumentService.format,
    beforeCreate: async (data) =>
      ParenthequeDocumentService.sanitizeTexts(data),
    beforeUpdate: async (params, data) =>
      ParenthequeDocumentService.sanitizeTexts(data),
  },
};
