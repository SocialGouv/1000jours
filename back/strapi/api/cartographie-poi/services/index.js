"use strict";

const sortNumbers = (a, b) => a - b;

const search = async (perimetre) => {
  if (!perimetre && !perimetre.length) return [];

  const knex = strapi.connections.default;

  const poisQuery = knex("cartographie_pois")
    .select(
      "cartographie_pois.nom",
      "cartographie_pois.telephone",
      "cartographie_pois.courriel",
      "cartographie_pois.site_internet",
      "cartographie_types.nom as type_nom",
      "cartographie_types.categorie as type_categorie",
      knex.raw(`
        adresse_elements->>'geocode_adresse' as adresse,
        adresse_elements->>'geocode_code_postal' as code_postal,
        adresse_elements->>'geocode_commune' as commune,
        adresse_elements->>'geocode_position_longitude' as position_longitude,
        adresse_elements->>'geocode_position_latitude' as position_latitude
      `)
    )
    .crossJoin(
      knex.raw("jsonb_array_elements(??) as adresse_elements", [
        "cartographie_adresses_json",
      ])
    )
    .join(
      "cartographie_types",
      "cartographie_pois.type",
      "=",
      "cartographie_types.id"
    );

  const lngs = [perimetre[0], perimetre[2]].sort(sortNumbers);
  const lats = [perimetre[1], perimetre[3]].sort(sortNumbers);

  poisQuery.whereRaw(
    `
(adresse_elements->>'geocode_position_longitude')::float > ? AND
(adresse_elements->>'geocode_position_longitude')::float < ? AND
(adresse_elements->>'geocode_position_latitude')::float > ? AND
(adresse_elements->>'geocode_position_latitude')::float < ?
`,
    [lngs[0], lngs[1], lats[0], lats[1]]
  );

  const pois = await poisQuery;

  return pois.map((poi) => {
    const {
      nom,
      telephone,
      courriel,
      site_internet,
      type_nom: type,
      type_categorie: categorie,
      adresse,
      code_postal,
      commune,
      position_longitude,
      position_latitude,
    } = poi;

    return {
      nom,
      type,
      categorie,
      telephone,
      courriel,
      site_internet,
      adresse,
      code_postal,
      commune,
      position_longitude,
      position_latitude,
    };
  });
};

module.exports = {
  search,
};
