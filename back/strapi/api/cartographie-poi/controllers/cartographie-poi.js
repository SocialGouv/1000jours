"use strict";

const PoiService = require("../services");

const searchParams = ["perimetre", "types", "thematiques", "etapes"];

const suggestionsParams = [
  "nouveauxPois",
  "suggestionsAmeliorations",
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

const suggestions = async (context) => {
  try {
    return PoiService.suggestions(buildParams(context, suggestionsParams));
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = { search, count, suggestions };
