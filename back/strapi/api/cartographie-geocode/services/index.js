"use strict";

const axios = require("axios");

const GEOCODE_SERVICE_URL = "https://api-adresse.data.gouv.fr";

const GEOCODE_FIELDS = ["adresse", "code_postal", "commune"];

const formatGeocodeResult = ({ properties, geometry }) => ({
  geocode_adresse: `${properties.name || ""}`.trim(),
  geocode_code_postal: properties.postcode || "",
  geocode_commune: properties.city || "",
  geocode_position_longitude: geometry.coordinates[0],
  geocode_position_latitude: geometry.coordinates[1],
  geocode: true,
});

const geo = async (data, type = "geocode") => {
  const params =
    type === "reverse"
      ? { lon: data.position_longitude, lat: data.position_latitude }
      : { q: GEOCODE_FIELDS.map((field) => data[field] || "").join(" ") };

  const service = type === "reverse" ? "reverse" : "search";
  const url = `${GEOCODE_SERVICE_URL}/${service}`;

  const response = await axios(url, { params });

  const { data: result } = response || {};

  // TODO: handle 'no result'
  if (!result || !result.features || !result.features.length) return null;

  const feature = result.features[0];

  return formatGeocodeResult(feature);
};

const geocodeData = async (data) => {
  let geocodeType;

  if (data.adresse || data.code_postal || data.commune) {
    geocodeType = "geocode";
  } else if (data.position_longitude && data.position_latitude) {
    geocodeType = "reverse";
  } else {
    return null;
  }

  return geo(data, geocodeType);
};

module.exports = {
  geocodeData,
};
