const { slugLower } = require("../../string/services");

const mapPrefix = (arr, prefix, sep = "_") =>
  arr.map((value) => `${prefix}${sep}${value}`);

const geocodePrefix = (arr) => mapPrefix(arr, "geocode");

const FIELDS_ADRESSE = ["adresse", "code_postal", "commune"];
const FIELDS_POSITION = ["position_longitude", "position_latitude"];
const FIELDS_ADRESSE_GEOCODE = geocodePrefix(FIELDS_ADRESSE);
const FIELDS_POSITION_GEOCODE = geocodePrefix(FIELDS_POSITION);

const FIELDS_GEOCODE_RESULS = [
  "longitude",
  "latitude",
  "result_housenumber",
  "result_name",
  "result_postcode",
  "result_city",
];

const concatFields = (fields, data) =>
  fields
    .map((field) => (typeof data[field] === "string" ? data[field].trim() : ""))
    .join(" ")
    .trim();

const createNonGeocodedAdresseLigne = (geocode) =>
  concatFields(FIELDS_ADRESSE, geocode) ||
  concatFields(FIELDS_POSITION, geocode);

const createGeocodedAdresseLigne = (geocode) =>
  concatFields(FIELDS_ADRESSE_GEOCODE, geocode) ||
  concatFields(FIELDS_POSITION_GEOCODE, geocode);

const formatLigneIdentifiant = (geocode) => {
  if (!geocode) return null;

  const ligne = createGeocodedAdresseLigne(geocode);
  if (!ligne) return null;

  geocode.cartographie_ligne = ligne;
  geocode.identifiant = slugLower(ligne);

  return geocode;
};

const formatGeocodeResultGeojson = ({ properties, geometry }) =>
  formatLigneIdentifiant({
    // TODO: handle 'no result'
    geocode: true,

    geocode_adresse: properties.name || "",
    geocode_code_postal: properties.postcode || "",
    geocode_commune: properties.city || "",

    geocode_position_latitude: geometry.coordinates[1],
    geocode_position_longitude: geometry.coordinates[0],
  });

const formatGeocodeResultBatch = (data) => {
  const geocode = {
    // TODO: handle 'no result'
    geocode: true,

    geocode_adresse: `${data.result_housenumber || ""} ${
      data.result_name || ""
    }`.trim(),
    geocode_code_postal: data.result_postcode || "",
    geocode_commune: data.result_city || "",

    geocode_position_latitude:
      typeof data.latitude === "string" ? +data.latitude : null,
    geocode_position_longitude:
      typeof data.longitude === "string" ? +data.longitude : null,
  };

  const result = formatLigneIdentifiant(geocode);
  if (!result) {
    // if geocoding didn't return result
    // then keep old identifiant
    // to set `geocode` column to true later on
    geocode.identifiant = data.identifiant;
  }

  return geocode;
};
module.exports = {
  GEOCODE_ADRESSE_FIELDS: FIELDS_ADRESSE,
  GEOCODE_POSITION_FIELDS: FIELDS_POSITION,
  GEOCODE_RESULT_FIELDS: FIELDS_GEOCODE_RESULS,
  concatFields,
  formatGeocodeResultBatch,
  formatGeocodeResultGeojson,
};
