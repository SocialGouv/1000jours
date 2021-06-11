const selectFieldsGeocode = [
  "cartographie_identifiant",
  "adresse",
  "code_postal",
  "commune",
]
  .map((field) => `LOWER(elements->>'${field}') as ${field}`)
  .join(", ");

const fetchAdressesToGeocode = async (bucketSize) => {
  const knex = strapi.connections.default;

  return knex("cartographie_pois")
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
    })
    .limit(bucketSize);
};

const selectFieldsReverse = [
  "cartographie_identifiant",
  "position_longitude",
  "position_latitude",
]
  .map((field) => `elements->>'${field}' as ${field}`)
  .join(", ");

const fetchAdressesToReverseGeocode = async (bucketSize) => {
  const knex = strapi.connections.default;

  return knex("cartographie_pois")
    .distinct(knex.raw(selectFieldsReverse))
    .crossJoin(
      knex.raw("jsonb_array_elements(??) as elements", [
        "cartographie_adresses_json",
      ])
    )
    .whereRaw("elements->>'geocode' = ?", [false])
    .whereRaw("elements->>'adresse' is null")
    .whereRaw("elements->>'code_postal' is null")
    .whereRaw("elements->>'commune' is null")
    .limit(bucketSize);
};

module.exports = {
  fetchAdressesToGeocode,
  fetchAdressesToReverseGeocode,
};
