"use strict";

const { getCurrent } = require("../services/get-current");

const getCurrentResolver = async (obj, options, { context }) => {
  const infos = !context.params._infos;

  if (!infos) return context.badRequest("missing informations");

  try {
    return getCurrent(infos);
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
    getCurrent (
      infos: Informations!
    ): Etape
  `,
  resolver: {
    Query: {
      getCurrent: {
        description: "Retourne l'étape courante en fonction des informations ",
        resolverOf: "application::etape.etape.find",
        resolver: getCurrentResolver,
      },
    },
  },
};
