const { chain: streamChain } = require("stream-chain");

const { Batch } = require("../../stream/services");

const StringService = require("../../string/services");

const {
  GEOCODE_ADRESSE_FIELDS,
  GEOCODE_POSITION_FIELDS,
  GEOCODE_RESULT_FIELDS,
  concatFields,
  formatGeocodeResultBatch,
} = require("./format");
const {
  countAdressesToGeocode,
  countAdressesToReverseGeocode,
  fetchAdressesToGeocode,
  fetchAdressesToReverseGeocode,
} = require("./fetch");

const { geocodeRequestStream } = require("./request");

const GEOCODE_SERVICE_URL = "https://api-adresse.data.gouv.fr";

const BUCKET_SIZE = 1000;

const updateGeocodes = async (geocodes) => {
  console.log("[geocode] update:", geocodes.length, "geocode(s)");

  const knex = strapi.connections.default;

  const poisToUpdate = [];

  const identifiants = geocodes.reduce(
    (identifiants, { identifiant, geocode }) => {
      if (identifiant) {
        identifiants.push(identifiant);
      }

      return identifiants;
    },
    []
  );

  if (!identifiants.length) return 0;

  const identifiantsParams = identifiants.map(() => "?").join(",");

  const pois = await knex("cartographie_pois")
    .distinct("identifiant", "nom", "type", "cartographie_adresses_json")
    .crossJoin(
      knex.raw("jsonb_array_elements(??) as elements", [
        "cartographie_adresses_json",
      ])
    )
    .whereRaw(
      `elements->>'identifiant' IN (${identifiantsParams})`,
      identifiants
    )
    .whereRaw("(elements->>'geocode')::boolean = false");
  if (!pois.length) return 0;

  for (const poi of pois) {
    let shouldUpdate = false;

    for (const { identifiant, geocode } of geocodes) {
      if (!identifiant) continue;

      shouldUpdate = poi.cartographie_adresses_json.reduce(
        (shouldUpdate, adresse) => {
          if (adresse.identifiant !== identifiant) return shouldUpdate;

          Object.assign(adresse, geocode);

          return true;
        },
        shouldUpdate
      );
    }

    if (shouldUpdate) {
      poi.cartographie_adresses_json = JSON.stringify(
        poi.cartographie_adresses_json
      );

      poisToUpdate.push(poi);
    }
  }

  if (!poisToUpdate.length) return 0;

  await knex("cartographie_pois")
    .insert(poisToUpdate)
    .onConflict("identifiant")
    .merge();

  return poisToUpdate.length;
};

const handleResult = (result) => {
  if (!result) return null;

  // previous identifiant returned by service, to update database
  const { identifiant } = result;

  // if format returns null, then geocode failed
  // setting geocode to `true` anyway
  // problematic addresses will be processed manually
  const geocode = formatGeocodeResultBatch(result);

  return { identifiant, geocode };
};

const geoStream = (adressesStream, service = "search/csv", fields) =>
  new Promise(async (resolve, reject) => {
    let updatedGeocodesCount = 0;

    try {
      const stream = await geocodeRequestStream(service, adressesStream, [
        "identifiant",
        ...fields,
      ]);

      const chain = streamChain([
        stream(),
        handleResult,
        new Batch({ size: BUCKET_SIZE }),
        async (geocodes) => {
          if (!geocodes.length) return updatedGeocodesCount;

          const updatedPoisCount = await updateGeocodes(geocodes);

          updatedGeocodesCount += updatedPoisCount;

          console.log(`[geocode] updated: ${updatedGeocodesCount} pois(s)`);

          return updatedGeocodesCount;
        },
        resolve,
      ]);
    } catch (e) {
      reject(e);
    }
  });

const fixColumn = (data) =>
  data
    ? // fixes geocode API 502 bad gateway error
      StringService.slugLower(data.replace(/’/g, "'")).replace(/-/g, " ")
    : // fixes geocode stream trim() error
      "";

const geocodeAdresses = async (adressesStream) => {
  // fix data
  const stream = streamChain([
    adressesStream,
    (adresse) => {
      GEOCODE_ADRESSE_FIELDS.forEach(
        (field) => (adresse[field] = fixColumn(adresse[field]))
      );

      // filter out empty queries
      const query = concatFields(GEOCODE_ADRESSE_FIELDS, adresse);
      if (!query) return null;

      return {
        identifiant: adresse.identifiant,
        query,
      };
    },
  ]);

  return geoStream(stream, "search/csv", ["query"]);
};

const reverseGeocodeAdresses = async (adressesStream) => {
  const stream = streamChain([
    adressesStream,
    (adresse) => ({
      identifiant: adresse.identifiant,
      longitude: adresse.position_longitude,
      latitude: adresse.position_latitude,
    }),
  ]);

  return geoStream(stream, "reverse/csv", ["longitude", "latitude"]);
};

const processMissingGeocodes = async () => {
  const count = await countAdressesToGeocode();
  if (count <= 0) return 0;

  console.log(`[geocode-batch] geocode, ${count} remaining`);

  const adressesStream = fetchAdressesToGeocode(BUCKET_SIZE).stream();

  try {
    return await geocodeAdresses(adressesStream);
  } catch (e) {
    console.error("[geocode-batch] geocode, error:", e);

    return 0;
  }
};

const processMissingAdresses = async () => {
  const count = await countAdressesToReverseGeocode();
  if (count <= 0) return 0;

  console.log(`[geocode-batch] reverse geocode, ${count} remaining`);

  const adressesStream = fetchAdressesToReverseGeocode(BUCKET_SIZE).stream();

  try {
    return await reverseGeocodeAdresses(adressesStream);
  } catch (e) {
    console.error("[geocode-batch] reverse geocode, error:", e);

    return 0;
  }
};

module.exports = {
  processMissingAdresses,
  processMissingGeocodes,
};
