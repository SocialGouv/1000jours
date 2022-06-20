"use strict";

const { partage } = require("./partage-epds");
const { partageForWidget } = require("./partage-for-widget");
const { contact } = require("./contact");
const { createReponsesEpdsWidget } = require("./create-reponses-epds-widget");

module.exports = {
  contact,
  createReponsesEpdsWidget,
  partage,
  partageForWidget,
};
