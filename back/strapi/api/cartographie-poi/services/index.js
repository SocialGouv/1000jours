"use strict";

const sortNumbers = (numbers) => {
  return numbers.sort(function (a, b) {
    return a - b
  });
}

const search = async (perimetre) => {
  if (!perimetre) {
    throw new Error("missing perimetre [long1, lat1, long2, lat2]");
  }
  if (perimetre.length !== 4) {
    throw new Error(
      "wrong number of arguments for perimetre [long1, lat1, long2, lat2]"
    );
  }

  const longs = sortNumbers([perimetre[0], perimetre[2]]);
  const lats = sortNumbers([perimetre[1], perimetre[3]]);

  const knex = strapi.connections.default;

  // TODO: use postgres geo capabilities with Point & box
  return knex("cartographie_pois")
    .where("geocode_position_longitude", ">", longs[0])
    .andWhere("geocode_position_longitude", "<", longs[1])
    .andWhere("geocode_position_latitude", ">", lats[0])
    .andWhere("geocode_position_latitude", "<", lats[1]);
};

module.exports = { search };
