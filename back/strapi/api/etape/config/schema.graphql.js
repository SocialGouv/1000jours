"use strict";

const EtapeService = require("../services");

const getCurrentEtapeResolver = async (_1, _2, { context }) => {
  const infos = context.params._infos;
  if (!infos) return context.badRequest("missing informations");

  try {
    return EtapeService.getCurrent(infos);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = {
  definition: `
    input Informations {
      projet: Boolean
      conception: Boolean
      grossesse: Boolean
      enfant: Boolean
      enfants: Boolean
      date: String
    }
  `,
  query: `
    getCurrentEtape (
      infos: Informations!
    ): Etape
  `,
  resolver: {
    Query: {
      getCurrentEtape: {
        description: "Retourne l'étape courante en fonction des informations",
        resolver: getCurrentEtapeResolver,
        resolverOf: "application::etape.etape.find",
      },
    },
  },
};
