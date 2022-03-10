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

const buildParams = (context) =>
  params.reduce((result, param) => {
    const value = context.params[`_${param}`];

    result[param] = value;

    return result;
  }, {});

const getPoisResolver = async (_1, _2, { context }) => {
  try {
    return PoiService.searchPois(buildParams(context));
  } catch (e) {
    context.badRequest(e.message);
  }
};

const getPoisCountResolver = async (_1, _2, { context }) => {
  try {
    return PoiService.countPois(buildParams(context));
  } catch (e) {
    context.badRequest(e.message);
  }
};

const getAdressesResolver = async (_1, _2, { context }) => {
  try {
    return PoiService.searchAdresses(buildParams(context));
  } catch (e) {
    context.badRequest(e.message);
  }
};

const getAdressesCountResolver = async (_1, _2, { context }) => {
  try {
    return PoiService.countAdresses(buildParams(context));
  } catch (e) {
    context.badRequest(e.message);
  }
};

const cartographieSuggestionsResolver = async (_1, _2, { context }) => {
  try {
    return PoiService.suggestions(context.request.body);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = {
  definition: `
    type Poi {
      nom: String
      type: String
      categorie: String
      telephone: String
      courriel: String
      site_internet: String
    }

    type CartographiePoisAdresse {
      adresse: String
      code_postal: String
      commune: String
      position_longitude: Float
      position_latitude: Float
      count: Int!
      pois: [Poi]
    }

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
      perimetre: [Float!]
      position: [Float!]
      types: [String!]
      thematiques: [String!]
      etapes: [String!]
      limit: Int
    ): [CartographiePoiAdresse]

    searchPoisCount (
      perimetre: [Float!]
      position: [Float!]
      types: [String!]
      thematiques: [String!]
      etapes: [String!]
      limit: Int
    ): Int

    searchPoisAdresses (
      perimetre: [Float!]
      position: [Float!]
      types: [String!]
      thematiques: [String!]
      etapes: [String!]
      limit: Int
    ): [CartographiePoisAdresse]

    searchPoisAdressesCount (
      perimetre: [Float!]
      position: [Float!]
      types: [String!]
      thematiques: [String!]
      etapes: [String!]
      limit: Int
    ): Int
  `,
  mutation: `
    cartographieSuggestions (
      nouveaux_pois: String
      suggestions_ameliorations: String
      nombre_enfants: Int!
      code_postal: String!
    ): Boolean
  `,
  resolver: {
    Query: {
      searchPois: {
        description: "Retourne une liste de POIs en fonction de filtres",
        resolver: getPoisResolver,
        resolverOf: "application::cartographie-poi.cartographie-poi.search",
      },
      searchPoisCount: {
        description: "Retourne le nombre de POIs en fonction de filtres",
        resolver: getPoisCountResolver,
        resolverOf: "application::cartographie-poi.cartographie-poi.count",
      },
      searchPoisAdresses: {
        description:
          "Retourne une liste d'adresses regroupant des POIs en fonction de filtres",
        resolver: getAdressesResolver,
        resolverOf:
          "application::cartographie-poi.cartographie-poi.searchAdresses",
      },
      searchPoisAdressesCount: {
        description:
          "Retourne le nombre d'adresses des POIs en fonction de filtres",
        resolver: getAdressesCountResolver,
        resolverOf:
          "application::cartographie-poi.cartographie-poi.countAdresses",
      },
    },
    Mutation: {
      cartographieSuggestions: {
        description: "Envoie de suggestions pour la cartographie",
        resolver: cartographieSuggestionsResolver,
        resolverOf: "application::cartographie-poi.cartographie-poi.suggestions",
      }
    },
  },
};
