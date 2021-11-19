"use strict";

const ReponsesEpdsService = require("../services");

const contactEpds = async (_1, _2, { context }) => {
  try {
    return ReponsesEpdsService.contact(context.request.body);
  } catch (e) {
    context.badRequest(e.message);
  }
};

const partageEpds = async (_1, _2, { context }) => {
  try {
    return ReponsesEpdsService.partage(context.request.body);
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
      prenom: String
      nombre_enfants: Int
      naissance_dernier_enfant: String
    ): Boolean
    
    epdsPartage (
      email: String
      email_pro: String!
      email_pro_secondaire: String
      telephone: String
      prenom: String
      nom: String
      score: String
      detail_questions: [String]
      detail_score: [String]
      detail_reponses: [String]
      id_reponses: String
    ): Boolean
  `,
  resolver: {
    Mutation: {
      epdsContact: {
        description: "Envoie une demande de contact post-partum",
        resolver: contactEpds,
        resolverOf: "application::reponses-epds.reponses-epds.contact",
      },
      epdsPartage: {
        description: "Envoie des réponses au questionnaire EPDS par email",
        resolver: partageEpds,
        resolverOf: "application::reponses-epds.reponses-epds.partage",
      }
    },
  },
};
