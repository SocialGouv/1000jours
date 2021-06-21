"use strict";

const PoiService = require("../services");

const params = ["perimetre", "types", "thematiques"];

const search = async (context) => {
  try {
    return PoiService.search(
      params.reduce((result, param) => {
        const value = context.request.query[param];

        result[param] = value ? JSON.parse(value) : null;

        return result;
      }, {})
    );
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = { search };
