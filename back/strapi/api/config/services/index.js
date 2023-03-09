"use strict";

const ModelsService = require("../../models/services");

const format = (entity) => {
  return ModelsService.format(entity, "config");
};

module.exports = {
  ...ModelsService,
  format,
};
