"use strict";

const { partage } = require("./partage-epds");
const { contact } = require("./contact");
const { contactConfirmed } = require("./contact-confirmed");
const { createReponsesEpdsWidget } = require("./create-reponses-epds-widget");
const {
  partagePourSoiMeme,
  partageEntourage,
} = require("./partage-for-widget");

module.exports = {
  contact,
  contactConfirmed,
  createReponsesEpdsWidget,
  partage,
  partageEntourage,
  partagePourSoiMeme,
};
