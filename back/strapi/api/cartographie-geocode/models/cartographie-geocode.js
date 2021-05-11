"use strict";

const StringService = require("../../string/services");
const CartographieGeocodeService = require("../services");

const createIdentifiant = ({
  adresse,
  code_postal,
  commune,
  position_longitude,
  position_latitude,
}) =>
  StringService.slugLower(adresse, code_postal, commune) ||
  StringService.slugLower(position_longitude, position_latitude);

const beforeSave = async (data) => {
  // TODO: si adresse ou code_postal ou commune changent
  // alors, calculer l'identifiant (slug)
  // puis, chercher en base s'il existe
  // s'il existe, merge les geocodes
  //    et basculer les POI du geocode courant vers le geocode mergé
  // sinon vérifier qu'il y a d'autres POIs atatchées au geocode
  //   si oui, créer un nouveau
  //   si non, mettre à jour celui-là

  // TODO: utiliser createIdentifiant
  const identifiant = createIdentifiant(data);

  console.log(data);

  if (identifiant !== data.identifiant) {
    data.identifiant = identifiant;
    data.has_geocode = false;

    return CartographieGeocodeService.updateGeocode(data);
  }
};

module.exports = {
  createIdentifiant,

  lifecycles: {
    beforeCreate: beforeSave,
    beforeUpdate: (params, data) => beforeSave(data),
  },
};
