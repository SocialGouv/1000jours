const { GEOCODE_ADRESSE_FIELDS, GEOCODE_POSITION_FIELDS } = require("./format");

const selectFieldsGeocode = ["identifiant", ...GEOCODE_ADRESSE_FIELDS]
  .map((field) => `LOWER(elements->>'${field}') as ${field}`)
  .join(", ");

const selectFieldsReverse = ["identifiant", ...GEOCODE_POSITION_FIELDS]
  .map((field) => `elements->>'${field}' as ${field}`)
  .join(", ");

const fetchAdressesToGeocode = (bucketSize) => {
  const knex = strapi.connections.default;

  const query = knex("cartographie_pois")
    .distinct(knex.raw(selectFieldsGeocode))
    .crossJoin(
      knex.raw("jsonb_array_elements(??) as elements", [
        "cartographie_adresses_json",
      ])
    )
    .whereRaw("elements->>'geocode' = ?", [false])
    .andWhere((q) => {
      q.whereRaw("elements->>'adresse' is not null")
        .orWhereRaw("elements->>'code_postal' is not null")
        .orWhereRaw("elements->>'commune' is not null");
    });

  if (bucketSize) query.limit(bucketSize);

  return query;
};

const fetchAdressesToReverseGeocode = (bucketSize) => {
  const knex = strapi.connections.default;

  const query = knex("cartographie_pois")
    .distinct(knex.raw(selectFieldsReverse))
    .crossJoin(
      knex.raw("jsonb_array_elements(??) as elements", [
        "cartographie_adresses_json",
      ])
    )
    .whereRaw("elements->>'geocode' = ?", [false])
    .whereRaw("elements->>'adresse' is null")
    .whereRaw("elements->>'code_postal' is null")
    .whereRaw("elements->>'commune' is null");

  if (bucketSize) query.limit(bucketSize);

  return query;
};

const countAdressesToGeocode = async () => {
  const knex = strapi.connections.default;

  const subQuery = fetchAdressesToGeocode();

  const result = await knex.count("identifiant").from(subQuery.as("test"));

  return result && result[0] && result[0].count;
};

const countAdressesToReverseGeocode = async () => {
  const knex = strapi.connections.default;

  const subQuery = fetchAdressesToReverseGeocode();

  const result = await knex.count("identifiant").from(subQuery.as("test"));

  return result && result[0] && result[0].count;
};

module.exports = {
  countAdressesToGeocode,
  countAdressesToReverseGeocode,
  fetchAdressesToGeocode,
  fetchAdressesToReverseGeocode,
};
