"use strict";

const PoiService = require("../services");

const getPoisResolver = async (_1, _2, { context }) => {
  const perimetre = context.params._perimetre;

  try {
    return PoiService.search(perimetre);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = {
  query: `
    searchPois (
      perimetre: [Float!]
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
