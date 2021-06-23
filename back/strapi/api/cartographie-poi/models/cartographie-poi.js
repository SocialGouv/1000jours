"use strict";

const StringService = require("../../string/services");

const CartographiePoi = require("./cartographie-poi.settings");
const CartographieAdresse = require("../../../components/cartographie/adresse");
const CartographieGeocodeService = require("../../cartographie-geocode/services");
const { slugLower } = require("../../string/services");

const formatReferences = async (data) => {
  for (const reference of data.references) {
    const source = await strapi
      .query("cartographie-source")
      .findOne({ id: reference.cartographie_source });
    if (!source) continue;

    reference.identifiant = slugLower(source.identifiant, reference.valeur);
  }

  data.cartographie_references_json = data.references;
  data.references = [];
};

const formatAndGeocodeAdresses = async (data) => {
  for (const adresse of data.cartographie_adresses) {
    StringService.trimObjectFields(CartographieAdresse.attributes, adresse);

    const geocode = await CartographieGeocodeService.geocodeData(adresse);
    if (!geocode) continue;

    Object.assign(adresse, geocode);
  }

  data.cartographie_adresses_json = data.cartographie_adresses;
  data.cartographie_adresses = [];
};

const formatIdentifiant = async (data) => {
  const type = await strapi
    .query("cartographie-types")
    .findOne({ id: data.type });
  if (!type) throw new Error(`Type inconnu: ${data.type}`);

  data.identifiant = StringService.slugLower(
    type.nom,
    data.nom,
    StringService.randomHash()
  );
};

const beforeSave = async (data) => {
  if (!data.type) throw new Error("Le type d'un POI est obligatoire");

  StringService.trimObjectFields(CartographiePoi.attributes, data);

  await formatReferences(data);
  await formatAndGeocodeAdresses(data);

  await formatIdentifiant(data);
};

const afterFind = async (data) => {
  data.cartographie_adresses = data.cartographie_adresses_json;

  if (data.cartographie_references_json) {
    for (const reference of data.cartographie_references_json) {
      if (!reference.cartographie_source) continue;

      const source = await strapi
        .query("cartographie-source")
        .findOne({ id: reference.cartographie_source });

      reference.cartographie_source = source;
    }

    data.references = data.cartographie_references_json;
  }
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
