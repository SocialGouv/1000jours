"use strict";

const ModelsService = require("../../models/services");

const format = (entity) => ModelsService.format(entity, "questionnaire-tnd");

module.exports = { ...ModelsService, format };
