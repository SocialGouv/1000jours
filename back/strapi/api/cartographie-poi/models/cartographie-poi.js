"use strict";

const { attributes } = require("./cartographie-poi.settings");
const CartographieCategoriesService = require("../../cartographie-categories/services");
const CartographieGeocodeService = require("../../cartographie-geocode/services");

const beforeSave = async (data) => {
  Object.keys(attributes).forEach((key) => {
    if (data[key] && attributes[key].type === "string") {
      data[key] = data[key].trim();
    }
  });

  const categorie = CartographieCategoriesService.getCategorie(data.type);
  if (categorie) {
    data.cartographie_categorie = categorie;
  }

  const geocode = await CartographieGeocodeService.geocodeData(data);
  if (geocode) {
    Object.assign(data, geocode);
  }
};

module.exports = {
  lifecycles: {
    beforeCreate: beforeSave,
    beforeUpdate: (params, data) => beforeSave(data),
  },
};
