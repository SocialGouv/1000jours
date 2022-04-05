"use strict";

const EtapeService = require("../services");

const getCurrentEtapeControler = async (context) => {
  const { infos } = context.request.body.input;

  if (!infos) return context.badRequest("missing informations");

  try {
    return await EtapeService.getCurrent(infos);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = { getCurrent: getCurrentEtapeControler };
