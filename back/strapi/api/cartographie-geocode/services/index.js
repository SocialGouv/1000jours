"use strict";

const axios = require("axios");

const {
  GEOCODE_FIELDS,
  concatFields,
  formatGeocodeResultGeojson,
} = require("./format");

const GEOCODE_SERVICE_URL = "https://api-adresse.data.gouv.fr";

const geocodeRequest = async (data, service, params) => {
  const response = await axios(`${GEOCODE_SERVICE_URL}/${service}`, {
    params: {
      ...params,
      limit: 1,
    },
  });

  const { data: result } = response || {};

  // if result features are empty, then geocode failed
  // setting geocode to `true` anyway
  // problematic addresses will be processed manually
  return result && result.features && result.features.length
    ? formatGeocodeResultGeojson(result.features[0])
    : { geocode: true };
};

const geocodeData = async (data) => {
  try {
    const query = concatFields(GEOCODE_FIELDS, data);
    const params = { q: query };

    const { position_longitude: lon, position_latitude: lat } = data;

    if (query) {
      // add geographical priority with position if any
      if (lon) params.lon = lon;
      if (lat) params.lat = lat;

      return geocodeRequest(data, "search", params);
    }

    if (lon && lat) return geocodeRequest(data, "reverse", { lat, lon });
  } catch (e) {
    console.error("[geocode] error:", e);
  }

  return null;
};

module.exports = {
  geocodeData,
};
