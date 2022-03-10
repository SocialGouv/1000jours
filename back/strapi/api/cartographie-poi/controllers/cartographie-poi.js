"use strict";

const PoiService = require("../services");

const params = [
  "perimetre",
  "position",
  "types",
  "thematiques",
  "etapes",
  "limit",
];

const suggestionsParams = [
  "nouveaux_pois",
  "suggestions_ameliorations",
  "nombre_enfants",
  "code_postal",
];

const buildParams = (context, params = searchParams) =>
  params.reduce((result, param) => {
    const value = context.request.query[param];

    result[param] = value ? JSON.parse(value) : null;

    return result;
  }, {});

const search = async (context) => {
  try {
    return PoiService.searchPois(buildParams(context));
  } catch (e) {
    context.badRequest(e.message);
  }
};

const count = async (context) => {
  try {
    return PoiService.countPois(buildParams(context));
  } catch (e) {
    context.badRequest(e.message);
  }
};

const suggestions = async (context) => {
  try {
    return PoiService.suggestions(buildParams(context, suggestionsParams));
  } catch (e) {
    context.badRequest(e.message);
  }
};

const searchAdresses = async (context) => {
  try {
    return PoiService.searchAdresses(buildParams(context));
  } catch (e) {
    context.badRequest(e.message);
  }
};

const countAdresses = async (context) => {
  try {
    return PoiService.countAdresses(buildParams(context));
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = {
  count,
  countAdresses,
  search,
  searchAdresses,
  suggestions,
};
