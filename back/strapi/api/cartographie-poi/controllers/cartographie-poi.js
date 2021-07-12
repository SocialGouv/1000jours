"use strict";

const PoiService = require("../services");

const params = ["perimetre", "types", "thematiques", "etapes"];

const buildParams = (context) =>
  params.reduce((result, param) => {
    const value = context.request.query[param];

    result[param] = value ? JSON.parse(value) : null;

    return result;
  }, {});

const search = async (context) => {
  try {
    return PoiService.search(buildParams(context));
  } catch (e) {
    context.badRequest(e.message);
  }
};

const count = async (context) => {
  try {
    return PoiService.count(buildParams(context));
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = { search, count };
