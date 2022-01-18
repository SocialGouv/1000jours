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


const createReponsesEpdsWidget = async (_1, _2, { context }) => {
  try {
    return ReponsesEpdsService.createReponsesEpdsWidget(context.request.body);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = {
  definition: ``,
  mutation: `
    epdsContact (
      email: String
      telephone: String
      prenom: String
      nombre_enfants: Int
      naissance_dernier_enfant: String
      moyen: String
      horaires: String
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

    createReponsesEpdsWidget(
      genre: ENUM_REPONSESEPDS_GENRE
      compteur: Int
      score: Int
      source: ENUM_REPONSESEPDS_SOURCE
      reponse_1: Int
      reponse_2: Int
      reponse_3: Int
      reponse_4: Int
      reponse_5: Int
      reponse_6: Int
      reponse_7: Int
      reponse_8: Int
      reponse_9: Int
      reponse_10: Int
      langue: ID
      source_widget_nom: String!
    ): ReponsesEpds
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
      },
      createReponsesEpdsWidget: {
        description: "Création de réponses au questionnaire EPDS à travers l'utilisation du widget",
        resolver: createReponsesEpdsWidget,
        resolverOf: "application::reponses-epds.reponses-epds.createReponsesEpdsWidget",
      }
    },
  },
};
