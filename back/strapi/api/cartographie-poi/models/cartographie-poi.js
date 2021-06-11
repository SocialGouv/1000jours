"use strict";

const CartographiePoi = require("./cartographie-poi.settings");
const CartographieAdresse = require("../../../components/cartographie/adresse");
const CartographieGeocodeService = require("../../cartographie-geocode/services");
const { slugLower } = require("../../string/services");

const trimStringFields = (attributes, data) =>
  Object.keys(attributes).forEach((key) => {
    if (data[key] && attributes[key].type === "string") {
      data[key] = data[key].trim();
    }
  });

const beforeSave = async (data) => {
  trimStringFields(CartographiePoi.attributes, data);

  for (const reference of data.references) {
    const source = await strapi
      .query("cartographie-source")
      .findOne({ id: reference.cartographie_source });
    if (!source) continue;

    reference.identifiant = slugLower(source.identifiant, reference.valeur);
  }

  data.cartographie_references_json = data.references;
  data.references = [];

  for (const adresse of data.cartographie_adresses) {
    trimStringFields(CartographieAdresse.attributes, adresse);

    const geocode = await CartographieGeocodeService.geocodeData(adresse);

    if (geocode) {
      Object.assign(adresse, geocode);
    }
  }

  data.cartographie_adresses_json = data.cartographie_adresses;

  data.cartographie_adresses = [];
};

const afterFind = (data) => {
  data.cartographie_adresses = data.cartographie_adresses_json;
  data.references = data.cartographie_references_json;
};

module.exports = {
  lifecycles: {
    afterFind: (results) => results.map(afterFind),
    afterFindOne: afterFind,
    beforeCreate: beforeSave,
    beforeUpdate: (params, data) => beforeSave(data),
    afterCreate: afterFind,
    afterUpdate: afterFind,
  },
};
