"use strict";

const { partage } = require("./partage-epds");
const { contact } = require("./contact");
const { createReponsesEpdsWidget } = require("./create-reponses-epds-widget");

module.exports = {
  contact,
  partage,
  createReponsesEpdsWidget
};
