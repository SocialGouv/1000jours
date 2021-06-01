"use strict";

const { find } = require("strapi-deepsearch-service");

const sortNumbers = (a, b) => a - b;

const search = async (perimetre) => {
  if (!perimetre) {
    throw new Error("missing perimetre [long1, lat1, long2, lat2]");
  }
  if (perimetre.length !== 4) {
    throw new Error(
      "wrong number of arguments for perimetre [long1, lat1, long2, lat2]"
    );
  }

  const lngs = [perimetre[0], perimetre[2]].sort(sortNumbers);
  const lats = [perimetre[1], perimetre[3]].sort(sortNumbers);

  const knex = strapi.connections.default;

  const query = {
    "cartographie_adresses.geocode_position_longitude_gt": lngs[0],
    "cartographie_adresses.geocode_position_longitude_lt": lngs[1],
    "cartographie_adresses.geocode_position_latitude_gt": lats[0],
    "cartographie_adresses.geocode_position_latitude_lt": lats[1],
  };

  return find(strapi.query("cartographie-poi").model, query);

  // TODO: use postgres geo capabilities with Point & box
  return strapi.query("cartographie-poi").find(query);
};

module.exports = { search };
