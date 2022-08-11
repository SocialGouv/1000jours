"use strict";

const format = async (data) => {
  if (data.types) {
    data.types = data.types.filter((type) => {
      type.value = type.value.trim();

      return type.value;
    });
  }

  if (data.cartographie_pois_type) {
    const type = await strapi
      .query("cartographie-types")
      .findOne({ id: data.cartographie_pois_type });

    if (!type) {
      throw new Error(
        `Aucun type de POI de ce type : ${data.cartographie_pois_type}`
      );
    }

    data.identifiant = type.nom;
  }
};

module.exports = {
  lifecycles: {
    beforeCreate: format,
    beforeUpdate: (_params, data) => format(data),
  },
};
