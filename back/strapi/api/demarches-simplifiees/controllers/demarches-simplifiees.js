"use strict";

const DemarchesSimplifieesService = require("../services");

const getDossiers = async (context) => {
  const { date_after: date } = context.query;

  try {
    return await DemarchesSimplifieesService.getDossiers(date);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = { getDossiers };
