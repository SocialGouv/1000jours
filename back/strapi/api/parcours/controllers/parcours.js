"use strict";

const ParcoursService = require("../services");

const getCurrentParcoursControler = async (context) => {
  const { infos } = context.request.body.input;

  if (!infos) return context.badRequest("missing informations");

  try {
    return ParcoursService.getCurrent(infos);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = { getCurrent: getCurrentParcoursControler };
