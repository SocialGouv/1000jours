"use strict";

const RessourceService = require("../services");

const partageRessourcesParMail = async (_1, _2, { context }) => {
  try {
    return RessourceService.partageRessourcesParMail(context.request.body);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = {
  definition: ``,
  mutation: `
    partageRessourcesParMail (
      email: String
    ): Boolean
  `,
  resolver: {
    Mutation: {
      partageRessourcesParMail: {
        description: "Envoie d'un mail pour partager les ressources",
        resolver: partageRessourcesParMail,
        resolverOf:
          "application::ressources.ressources.partageRessourcesParMail",
      },
    },
  },
};
