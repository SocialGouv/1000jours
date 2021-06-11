"use strict";

const PoiService = require("../services");

const getPoisResolver = async (_1, _2, { context }) => {
  const { _perimetre: perimetre, _code_postal: code_postal } = context.params;

  try {
    return PoiService.search(perimetre, code_postal);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = {
  query: `
    searchPois (
      perimetre: [Float!]
      code_postal: String
    ): [CartographiePoi]
  `,
  resolver: {
    Query: {
      searchPois: {
        description: "Retourne une liste de POIs en fonction d'un périmètre",
        resolver: getPoisResolver,
        resolverOf: "application::cartographie-poi.cartographie-poi.find",
      },
    },
  },
};
