"use strict";

const { GEOCODE_ADRESSE_FIELDS, concatFields } = require("./format");
const { geocodeRequest } = require("./request");

const GEOCODE_SERVICE_URL = "https://api-adresse.data.gouv.fr";

const geocodeData = async (data) => {
  try {
    const query = concatFields(GEOCODE_ADRESSE_FIELDS, data);
    const params = {};

    const { position_longitude: lon, position_latitude: lat } = data;

    // add geographical priority with position, if any
    if (lon) params.lon = lon;
    if (lat) params.lat = lat;

    // if query is empty but longitude & latitude exist
    // then do a reverse geocode request
    if (!query && lon && lat) {
      return geocodeRequest("reverse", params);
    }

    if (query) {
      params.q = query;

      return geocodeRequest("search", params);
    }
  } catch (e) {
    console.error("[geocode] error:", e);
  }

  return null;
};

module.exports = {
  geocodeData,
};
