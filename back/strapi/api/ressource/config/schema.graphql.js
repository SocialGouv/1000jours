"use strict";

const RessourceService = require("../services");

const partageRessourcesByMail = async (_1, _2, { context }) => {
  try {
    return RessourceService.partageRessourcesByMail(context.request.body);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = {
  definition: ``,
  mutation: `
    partageRessourcesByMail (
      email: String
    ): Boolean
  `,
  resolver: {
    Mutation: {
      epdsContact: {
        description: "Envoie d'un mail pour partager les ressources",
        resolver: partageRessourcesByMail,
        resolverOf:
          "application::ressources.ressources.partageRessourcesByMail",
      },
    },
  },
};
