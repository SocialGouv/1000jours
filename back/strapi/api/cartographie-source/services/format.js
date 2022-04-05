const StringService = require("../../string/services");

const Adresse = require("../../../components/cartographie/adresse.json");

const GEO_FIELDS = Object.keys(Adresse.attributes).filter(
  (field) => !field.match(/geocode/)
);

const pick = (obj, fields) =>
  fields.reduce((result, field) => ((result[field] = obj[field]), result), {});

const formatReference = (source, entity, data) => {
  const valeur = entity.references;
  delete entity.references;

  const reference = {
    cartographie_source: source.id,
    data,
    valeur,
  };

  reference.identifiant = StringService.slugLower(source.identifiant, valeur);

  return reference;
};

const formatAdresse = (source, entity) => {
  const adresse = {
    ...pick(entity, GEO_FIELDS),
    geocode: false,
  };

  GEO_FIELDS.forEach((field) => delete entity[field]);

  adresse.cartographie_ligne =
    [adresse.adresse, adresse.code_postal, adresse.commune].join(" ").trim() ||
    [adresse.position_longitude, adresse.position_latitude].join(" ").trim();

  if (!adresse.cartographie_ligne) return null;

  adresse.identifiant = StringService.slugLower(adresse.cartographie_ligne);

  return adresse;
};

const formatPoi = (source, entity) => {
  if (entity.code_postal && entity.code_postal.length < 5) {
    entity.code_postal = entity.code_postal.padStart(5, "0");
  }

  for (const key of ["position_longitude", "position_latitude"]) {
    // TODO: transform based on pois actual types
    if (entity[key]) {
      const n = parseFloat(entity[key]);

      entity[key] = !isNaN(n) ? n : null;
    }
  }

  return entity;
};

const formatPoiFromData = (source, entity, data) => {
  const reference = formatReference(source, entity, data);

  const poi = formatPoi(source, entity);

  const adresse = formatAdresse(source, entity);
  // do not save POI without adresses to database
  if (!adresse) return null;

  return {
    identifiant: reference.identifiant,
    ...poi,
    cartographie_adresses_json: JSON.stringify(adresse),
    cartographie_references_json: JSON.stringify(reference),
  };
};

module.exports = {
  formatAdresse,
  formatPoi,
  formatPoiFromData,
  formatReference,
};
