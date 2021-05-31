"use strict";

const search = async (perimetre) => {
  if (!perimetre || perimetre.length !== 4) {
    throw new Error("missing perimetre [long1, lat1, long2, lat2]");
  }
  if (perimetre.length !== 4) {
    throw new Error(
      "wrong number of arguments for perimetre [long1, lat1, long2, lat2]"
    );
  }

  if (!perimetre || perimetre.length !== 4)
    return context.badRequest("missing perimetre [long1, lat1, long2, lat2]");

  const [long1, lat1, long2, lat2] = perimetre;

  const knex = strapi.connections.default;

  // TODO: use postgres geo capabilities with Point & box
  return knex("cartographie_pois")
    .where("position_latitude", ">", lat1)
    .andWhere("position_latitude", "<", lat2)
    .andWhere("position_longitude", ">", long1)
    .andWhere("position_longitude", "<", long2);
};

module.exports = { search };
