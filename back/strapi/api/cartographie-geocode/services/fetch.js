const knex = (...args) => strapi.connections.default(...args);

const selectFieldsGeocode = [
  "cartographie_identifiant",
  "adresse",
  "code_postal",
  "commune",
];

const fetchAdressesToGeocode = async (bucketSize) =>
  knex("components_cartographie_adresses")
    .select(...selectFieldsGeocode)
    .where("geocode", false)
    .andWhere((q) => {
      q.whereNotNull("adresse")
        .orWhereNotNull("code_postal")
        .orWhereNotNull("commune");
    })
    .groupBy(...selectFieldsGeocode)
    .limit(bucketSize);

const selectFieldsReverse = [
  "cartographie_identifiant",
  "position_longitude",
  "position_latitude",
];

const fetchAdressesToReverseGeocode = async (bucketSize) =>
  knex("components_cartographie_adresses")
    .select(...selectFieldsReverse)
    .where("geocode", false)
    .whereNull("adresse")
    .whereNull("code_postal")
    .whereNull("commune")
    .groupBy(...selectFieldsReverse)
    .limit(bucketSize);

module.exports = {
  fetchAdressesToGeocode,
  fetchAdressesToReverseGeocode,
};
