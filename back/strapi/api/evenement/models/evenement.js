"use strict";

const linkToEtapes = async (data) => {
  const { debut, fin } = data;

  const hasDebut = debut !== null && debut !== undefined;
  const hasFin = fin !== null && fin !== undefined;

  if (!hasDebut && !hasFin) return;

  const result = await strapi
    .query("etape")
    .model.query((queryBuilder) => {
      if (hasDebut && hasFin) {
        queryBuilder.where("debut", "<=", fin);
        queryBuilder.where("fin", ">", debut);

        return;
      }

      if (hasDebut) {
        queryBuilder.where("debut", "<=", debut);
        queryBuilder.where("fin", ">", debut);

        return;
      }

      queryBuilder.where("debut", "<=", fin);
      queryBuilder.where("fin", ">", fin);
    })
    .fetchAll();

  if (!result || !result.length) return;

  const etapes = result.models;

  const etapesIds = etapes.map((etape) => etape.id);

  if (!data || !data.etapes || !data.etapes.length) {
    data.etapes = etapesIds;

    return;
  }

  data.etapes = [...data.etapes, ...etapesIds];
};

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => linkToEtapes(data),
  },
};
