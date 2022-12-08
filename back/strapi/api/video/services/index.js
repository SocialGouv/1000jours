"use strict";

const ModelsService = require("../../models/services");

const format = (entity) => ModelsService.format(entity, "video");

module.exports = { ...ModelsService, format };
