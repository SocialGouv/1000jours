"use strict";

const PoiService = require("../services");

const getPoisResolver = async (_1, _2, { context }) => {
  const {
    _perimetre: perimetre,
    _types: types,
    _thematiques: thematiques,
    _etapes: etapes,
  } = context.params;

  try {
    return PoiService.search({ perimetre, types, thematiques, etapes });
  } catch (e) {
    context.badRequest(e.message);
  }
};

const getPoisCountResolver = async (_1, _2, { context }) => {
  const {
    _perimetre: perimetre,
    _types: types,
    _thematiques: thematiques,
    _etapes: etapes,
  } = context.params;

  try {
    return PoiService.count({ perimetre, types, thematiques, etapes });
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = {
  definition: `
    type CartographiePoiAdresse {
      nom: String
      type: String
      categorie: String
      telephone: String
      courriel: String
      site_internet: String
      adresse: String
      code_postal: String
      commune: String
      position_longitude: Float
      position_latitude: Float
    }
  `,
  query: `
    searchPois (
      perimetre: [Float!]!
      types: [String!]
      thematiques: [String!]
      etapes: [String!]
    ): [CartographiePoiAdresse]

    searchPoisCount (
      perimetre: [Float!]!
      types: [String!]
      thematiques: [String!]
      etapes: [String!]
    ): Int
  `,
  resolver: {
    Query: {
      searchPois: {
        description: "Retourne une liste de POIs en fonction d'un périmètre",
        resolver: getPoisResolver,
        resolverOf: "application::cartographie-poi.cartographie-poi.find",
      },
      searchPoisCount: {
        description: "Retourne le nombre de POIs en fonction d'un périmètre",
        resolver: getPoisCountResolver,
        resolverOf: "application::cartographie-poi.cartographie-poi.count",
      },
    },
  },
};
