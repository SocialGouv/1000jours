const StringService = require("../../string/services");
const CartographieGeocodeService = require("../../cartographie-geocode/services");

const Adresse = require("../../../components/cartographie/adresse.json");

const pick = (obj, fields) =>
  fields.reduce((result, field) => ((result[field] = obj[field]), result), {});

const knex = (...args) => strapi.connections.default(...args);

const GEO_FIELDS = Object.keys(Adresse.attributes).filter(
  (field) => !field.match(/geocode/)
);

const updatePoiData = async (source, { entity, data }, poi) => {
  // TODO: merge references
  // TODO: merge adresses
  // TODO: merge infos

  return false;
};

const formatReference = (source, entity, data) => {
  const valeur = entity.references;
  delete entity.references;

  const reference = {
    valeur,
    data: JSON.stringify(data),
    cartographie_source: source.id,
  };

  reference.identifiant = StringService.slugLower(source.identifiant, valeur);

  return reference;
};

const formatAdresse = (source, entity, data) => {
  const adresse = {
    ...pick(entity, GEO_FIELDS),
    geocode: false,
  };

  GEO_FIELDS.forEach((field) => delete entity[field]);

  adresse.cartographie_ligne =
    [adresse.adresse, adresse.code_postal, adresse.commune].join(" ").trim() ||
    [adresse.position_longitude, adresse.position_latitude].join(" ").trim();

  if (!adresse.cartographie_ligne) return null;

  adresse.cartographie_identifiant = StringService.slugLower(
    adresse.cartographie_ligne
  );

  return adresse;
};

const formatPoi = (source, entity, data) => {
  return entity;
};

const insertReference = async (reference) => {
  const [referenceId] = await knex("components_cartographie_source_references")
    .insert(reference)
    .returning("id");

  return referenceId;
};

const insertAdresse = async (adresse) => {
  const [adresseId] = await knex("components_cartographie_adresses")
    .insert(adresse)
    .returning("id");

  return adresseId;
};

const insertPoi = async (poi) => {
  const [poiId] = await knex("cartographie_pois").insert(poi).returning("id");

  return poiId;
};

const insertPoiData = async (source, { entity, data }) => {
  const adresse = formatAdresse(source, entity, data);
  // do not save POI without adresses to database
  if (!adresse) return null;

  const reference = formatReference(source, entity, data);

  const poi = formatPoi(source, entity, data);

  const [poiId, adresseId, referenceId] = await Promise.all([
    insertPoi(poi),
    insertAdresse(adresse),
    insertReference(reference),
  ]);

  await knex("cartographie_pois_components").insert([
    {
      order: 1,
      field: "cartographie_adresses",
      component_type: "components_cartographie_adresses",
      component_id: adresseId,
      cartographie_pois_id: poiId,
    },
    {
      order: 1,
      field: "references",
      component_type: "components_cartographie_source_references",
      component_id: referenceId,
      cartographie_pois_id: poiId,
    },
  ]);

  return true;
};

const upsertPoiData = async (source, { entity, data }) => {
  const references = JSON.stringify([
    {
      source: source.identifiant,
      reference: entity.references,
    },
  ]);

  const poi =
    false &&
    (await knex("cartographie_pois")
      .select("id", "references", "cartographie_data")
      .whereRaw(`?? @> ?`, ["references", references])
      .andWhere("type", entity.type)
      .first());

  return poi
    ? updatePoiData(source, { entity, data }, poi)
    : insertPoiData(source, { entity, data });
};

module.exports = { upsertPoiData };
