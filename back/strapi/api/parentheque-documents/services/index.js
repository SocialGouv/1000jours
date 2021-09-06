"use strict";

const ModelsService = require("../../models/services");

const format = (entity) =>
  ModelsService.format(entity, "parentheque-documents");

module.exports = { ...ModelsService, format };
