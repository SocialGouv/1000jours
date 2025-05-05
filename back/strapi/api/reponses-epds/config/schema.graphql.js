"use strict";

const ReponsesEpdsService = require("../services");

const contactEpds = async (_1, _2, { context }) => {
  try {
    return ReponsesEpdsService.contact(context.request.body);
  } catch (e) {
    context.badRequest(e.message);
  }
};

const contactConfirmedEpds = async (_1, _2, { context }) => {
  try {
    return ReponsesEpdsService.contactConfirmed(context.request.body);
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

const partageEpdsPourSoiMeme = async (_1, _2, { context }) => {
  try {
    return ReponsesEpdsService.partagePourSoiMeme(context.request.body);
  } catch (e) {
    context.badRequest(e.message);
  }
};

const partageEpdsEntourage = async (_1, _2, { context }) => {
  try {
    return ReponsesEpdsService.partageEntourage(context.request.body);
  } catch (e) {
    context.badRequest(e.message);
  }
};

module.exports = {
  definition: ``,
  mutation: `
    epdsContact (
      email: String
      horaires: String
      moyen: String
      naissance_dernier_enfant: String
      nombre_enfants: Int
      prenom: String
      score_question_dix: String
      telephone: String
      langue: String
      score: String
      situation: String
      departement: String
      nb_mois_de_grossesse: String
      nb_mois_dernier_enfant: String
    ): Boolean

    epdsContactConfirmed (
      email: String
      prenom: String
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
      temps_survey: Int
      langue: ID
      source_widget_nom: String!
    ): ReponsesEpds

    epdsPartagePourSoiMeme (
      email: String!
      prenom: String
      detail_questions: [String]
      detail_reponses: [String]
      date: String
      mood_level: String
    ): Boolean

    epdsPartageEntourage (
      email: String!
      prenom: String
      detail_questions: [String]
      detail_reponses: [String]
      date: String
      mood_level: String
    ): Boolean
  `,
  resolver: {
    Mutation: {
      createReponsesEpdsWidget: {
        description:
          "Création de réponses au questionnaire EPDS à travers l'utilisation du widget",
        resolver: createReponsesEpdsWidget,
        resolverOf:
          "application::reponses-epds.reponses-epds.createReponsesEpdsWidget",
      },
      epdsContact: {
        description: "Envoie une demande de contact post-partum",
        resolver: contactEpds,
        resolverOf: "application::reponses-epds.reponses-epds.contact",
      },
      epdsContactConfirmed: {
        description:
          "Lors d'une demande de contact post-partum, envoi d'un mail de confirmation au parent pour confirmer l'envoi de la demande",
        resolver: contactConfirmedEpds,
        resolverOf: "application::reponses-epds.reponses-epds.contact",
      },
      epdsPartage: {
        description: "Envoie des réponses au questionnaire EPDS par email",
        resolver: partageEpds,
        resolverOf: "application::reponses-epds.reponses-epds.partage",
      },
      epdsPartageEntourage: {
        description:
          "Envoie des réponses au questionnaire EPDS par email à une personne de son entourage",
        resolver: partageEpdsEntourage,
        resolverOf: "application::reponses-epds.reponses-epds.partageEntourage",
      },
      epdsPartagePourSoiMeme: {
        description:
          "Envoie des réponses au questionnaire EPDS par email à soi même",
        resolver: partageEpdsPourSoiMeme,
        resolverOf:
          "application::reponses-epds.reponses-epds.partagePourSoiMeme",
      },
    },
  },
};
