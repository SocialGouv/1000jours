const { chain: streamChain } = require("stream-chain");
const {
  createGeocodeStream: streamGeocoding,
  createReverseGeocodeStream: streamReverseGeocoding,
} = require("addok-geocode-stream");

const {
  GEOCODE_FIELDS,
  concatFields,
  formatGeocodeResultBatch,
} = require("./format");
const {
  fetchAdressesToGeocode,
  fetchAdressesToReverseGeocode,
} = require("./fetch");

const GEOCODE_SERVICE_URL = "https://api-adresse.data.gouv.fr";

const BUCKET_SIZE = 1000;

const knex = (...args) => strapi.connections.default(...args);

const updateGeocode = async (geocode, cartographie_identifiant) => {
  if (!cartographie_identifiant) return null;

  await knex("components_cartographie_adresses")
    .where({ cartographie_identifiant })
    .update(geocode);

  return true;
};

const handleResult = async (result) => {
  if (!result) return null;

  // previous identifiant returned by service, to update database
  const { cartographie_identifiant } = result;

  // if format returns null, then geocode failed
  // setting geocode to `true` anyway
  // problematic addresses will be processed manually
  const geocode = formatGeocodeResultBatch(result) || { geocode: true };

  try {
    return updateGeocode(geocode, cartographie_identifiant);
  } catch (e) {
    console.error("[geocode] batch error", e);
  }
};

const geoStream = (adresses, type = "geocode", options = {}) =>
  new Promise((resolve, reject) => {
    let resultsCount = 0;

    const streamCoding =
      type === "reverse" ? streamReverseGeocoding : streamGeocoding;

    const geocodeStream = streamCoding(GEOCODE_SERVICE_URL, {
      ...options,
      resultColumns: [
        "longitude",
        "latitude",
        "result_housenumber",
        "result_name",
        "result_postcode",
        "result_city",
      ],
      BUCKET_SIZE,
    }).on("error", reject);

    const stream = streamChain([
      async (result) => (resultsCount += await handleResult(result)),
    ]);

    geocodeStream
      .pipe(stream)
      .on("error", reject)
      .on("finish", () => resolve(resultsCount));

    stream.resume();

    adresses.forEach((adresse) => geocodeStream.write(adresse));

    geocodeStream.end();
  });

const fixColumn = (data) =>
  data
    ? // fixes geocode API 502 bad gateway error
      data.replace(/’/g, "'")
    : // fixes geocode stream trim() error
      "";

const geocodeAdresses = async (adresses) => {
  // fix data
  adresses.forEach((adresse) =>
    GEOCODE_FIELDS.forEach(
      (field) => (adresse[field] = fixColumn(adresse[field]))
    )
  );

  // filter out empty queries
  adresses = adresses.filter((adresse) =>
    concatFields(GEOCODE_FIELDS, adresse)
  );

  return geoStream(adresses, "geocode", { columns: GEOCODE_FIELDS });
};

const reverseGeocodeAdresses = async (adresses) =>
  geoStream(adresses, "reverse", {
    longitude: "position_longitude",
    latitude: "position_latitude",
  });

const processMissingGeocodes = async () => {
  const adresses = await fetchAdressesToGeocode(BUCKET_SIZE);
  if (!adresses.length) return 0;

  return geocodeAdresses(adresses);
};

const processMissingAdresses = async () => {
  const adresses = await fetchAdressesToReverseGeocode(BUCKET_SIZE);
  if (!adresses.length) return 0;

  return reverseGeocodeAdresses(adresses);
};

module.exports = {
  updateGeocode,
  processMissingGeocodes,
  processMissingAdresses,
};
