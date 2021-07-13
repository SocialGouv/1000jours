"use strict";

const ReponsesEpdsService = require("../services");

const contactEpds = async (_1, _2, { context }) => {
  try {
    return ReponsesEpdsService.contact(context.request.body);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = {
  definition: ``,
  mutation: `
    epdsContact (
      email: String!
      telephone: String
      prenom: String!
      nombre_enfants: Int!
      naissance_dernier_enfant: String!
    ): Boolean
  `,
  resolver: {
    Mutation: {
      epdsContact: {
        description: "Envoie une demande de contact post-partum",
        resolver: contactEpds,
        resolverOf: "application::reponses-epds.reponses-epds.contact",
      },
    },
  },
};
