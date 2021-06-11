"use strict";

const sortNumbers = (a, b) => a - b;

const search = async (perimetre, code_postal) => {
  if (!code_postal && !perimetre && !perimetre.length) return [];

  const knex = strapi.connections.default;

  const poisQuery = knex("cartographie_pois")
    .select("cartographie_pois.*")
    .crossJoin(
      knex.raw("jsonb_array_elements(??) as elements", [
        "cartographie_adresses_json",
      ])
    );

  if (code_postal) {
    poisQuery.whereRaw(`elements->>'geocode_code_postal' = ?`, [code_postal]);
  }

  if (perimetre) {
    const lngs = [perimetre[0], perimetre[2]].sort(sortNumbers);
    const lats = [perimetre[1], perimetre[3]].sort(sortNumbers);

    poisQuery.whereRaw(
      `
elements->>'geocode_position_longitude' > ? AND
elements->>'geocode_position_longitude' < ? AND
elements->>'geocode_position_latitude' > ? AND
elements->>'geocode_position_latitude' < ?
`,
      [lngs[0], lngs[1], lats[0], lats[1]]
    );
  }

  const pois = await poisQuery;

  return pois.map((p) => {
    p.cartographie_adresses = p.cartographie_adresses_json;
    return p;
  });
};

module.exports = { search };
