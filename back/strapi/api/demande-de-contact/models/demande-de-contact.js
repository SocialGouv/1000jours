"use strict";

const beforeSave = async (data) => {
  if (!data.widget_epds_source) throw new Error("La source est erronée");
  if (!data.reponses_epds)
    throw new Error("L'id du quesitonnaire EPDS est erroné");

  const sourceId = await strapi
    .query("widget-epds-sources")
    .findOne({ nom: data.widget_epds_source });

  data.widget_epds_source = sourceId;
};

module.exports = {
  beforeSave,
  lifecycles: {
    beforeCreate: beforeSave,
  },
};
