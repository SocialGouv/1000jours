"use strict";

const { getCurrent } = require("../services/get-current");

const getCurrentControler = async (context) => {
  const { infos } = context.request.body.input;

  if (!infos) return context.badRequest("missing informations");

  try {
    return getCurrent(infos);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = { getCurrent: getCurrentControler };
