const { slugLower } = require("../../string/services");

const mapPrefix = (arr, prefix, sep = "_") =>
  arr.map((value) => `${prefix}${sep}${value}`);

const geocodePrefix = (arr) => mapPrefix(arr, "geocode");

const FIELDS_ADRESSE = ["adresse", "code_postal", "commune"];
const FIELDS_POSITION = ["position_longitude", "position_latitude"];
const FIELDS_ADRESSE_GEOCODE = geocodePrefix(FIELDS_ADRESSE);
const FIELDS_POSITION_GEOCODE = geocodePrefix(FIELDS_POSITION);

const concatFields = (fields, data) =>
  fields
    .map((field) => (typeof data[field] === "string" ? data[field].trim() : ""))
    .join(" ")
    .trim();

const createLigne = (geocode) =>
  concatFields(FIELDS_ADRESSE_GEOCODE, geocode) ||
  concatFields(FIELDS_POSITION_GEOCODE, geocode);

const formatLigneIdentifiant = (geocode) => {
  if (!geocode) return null;

  const ligne = createLigne(geocode);
  if (!ligne) return null;

  geocode.cartographie_ligne = ligne;
  geocode.cartographie_identifiant = slugLower(ligne);

  return geocode;
};

const formatGeocodeResultGeojson = ({ properties, geometry }) =>
  formatLigneIdentifiant({
    // TODO: handle 'no result'
    geocode: true,

    geocode_adresse: properties.name || "",
    geocode_code_postal: properties.postcode || "",
    geocode_commune: properties.city || "",

    geocode_position_longitude: geometry.coordinates[0],
    geocode_position_latitude: geometry.coordinates[1],
  });

const formatGeocodeResultBatch = (data) =>
  formatLigneIdentifiant({
    // TODO: handle 'no result'
    geocode: true,

    geocode_adresse: `${data.result_housenumber || ""} ${
      data.result_name || ""
    }`.trim(),
    geocode_code_postal: data.result_postcode || "",
    geocode_commune: data.result_city || "",

    geocode_position_longitude:
      typeof data.longitude === "string" ? +data.longitude : null,
    geocode_position_latitude:
      typeof data.latitude === "string" ? +data.latitude : null,
  });

module.exports = {
  GEOCODE_FIELDS: FIELDS_ADRESSE,
  concatFields,
  formatGeocodeResultGeojson,
  formatGeocodeResultBatch,
};
