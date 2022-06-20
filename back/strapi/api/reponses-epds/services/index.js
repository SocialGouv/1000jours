"use strict";

const { partage } = require("./partage-epds");
const { contact } = require("./contact");
const { createReponsesEpdsWidget } = require("./create-reponses-epds-widget");
const {
  partagePourSoiMeme,
  partageEntourage,
} = require("./partage-for-widget");

module.exports = {
  contact,
  createReponsesEpdsWidget,
  partage,
  partageEntourage,
  partagePourSoiMeme,
};
