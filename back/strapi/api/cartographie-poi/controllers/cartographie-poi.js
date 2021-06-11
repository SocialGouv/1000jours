"use strict";

const StructureService = require("../services");

const search = async (context) => {
  const { code_postal } = context.request.query;
  let { perimetre } = context.request.query;

  perimetre = perimetre ? JSON.parse(perimetre) : null;

  try {
    return StructureService.search(perimetre, code_postal);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = { search };
