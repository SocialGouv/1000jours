"use strict";

const createReponsesEpdsWidget = async ({
  genre,
  compteur,
  score,
  source,
  reponse_1,
  reponse_2,
  reponse_3,
  reponse_4,
  reponse_5,
  reponse_6,
  reponse_7,
  reponse_8,
  reponse_9,
  reponse_10,
  langue,
  source_widget_nom,
  temps_survey,
}) => {
  const reponseEpds = {
    compteur,
    genre,
    langue,
    reponse_1,
    reponse_10,
    reponse_2,
    reponse_3,
    reponse_4,
    reponse_5,
    reponse_6,
    reponse_7,
    reponse_8,
    reponse_9,
    score,
    source,
    temps_survey,
  };

  if (!source_widget_nom)
    throw new Error(`Source du widget inconnu : ${source_widget_nom}`);

  const sourceWidget = await strapi
    .query("widget-epds-sources")
    .findOne({ nom: source_widget_nom });
  if (!sourceWidget)
    throw new Error(`Source du widget inconnu : ${source_widget_nom}`);
  reponseEpds.source_widget = sourceWidget;

  try {
    return strapi.query("reponses-epds").create(reponseEpds);
  } catch (e) {
    throw new Error(`Error : ${e.message}`);
  }
};

module.exports = {
  createReponsesEpdsWidget,
};
