"use strict";

const ModelsService = require("../../models/services");

const format = (entity) => {
  // fixes weird empty object issue and GraphQL `cannot return null` error
  if (entity.visuel && !entity.visuel.url) {
    entity.visuel.url = "";
  }

  return ModelsService.format(entity, "article");
};

module.exports = { ...ModelsService, format };
