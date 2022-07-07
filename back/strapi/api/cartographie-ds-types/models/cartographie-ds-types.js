"use strict";

const format = async (data) => {
  if (!data.cartographie_pois_type) return data;

  const type = await strapi
    .query("cartographie-types")
    .findOne(data.cartographie_pois_type);

  if (!type)
    throw new Error(
      `Aucun type de POI de ce type : ${data.cartographie_pois_type}`
    );

  const typeNom = type.nom;

  data.identifiant = typeNom;
};

module.exports = {
  lifecycles: {
    beforeCreate: format,
    beforeUpdate: format,
  },
};
