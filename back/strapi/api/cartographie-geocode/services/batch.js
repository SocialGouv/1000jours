const { chain: streamChain } = require("stream-chain");
const {
  createGeocodeStream: streamGeocoding,
  createReverseGeocodeStream: streamReverseGeocoding,
} = require("addok-geocode-stream");

const CartographieGeocode = require("./");

const GEOCODE_SERVICE_URL = "https://api-adresse.data.gouv.fr";

const knex = (...args) => strapi.connections.default(...args);

const indexifyItems = (items, field) =>
  items.reduce((index, item) => index.set(item[field], item), new Map());

const pick = (obj, fields) =>
  fields.reduce((result, field) => ((result[field] = obj[field]), result), {});

const bucketSize = 1000;

const geocodeFields = [
  "adresse",
  "code_postal",
  "commune",
  "position_longitude",
  "position_latitude",
];

const formatGeocode = (data) => {
  const identifiant = CartographieGeocode.createIdentifiant(data);
  if (!identifiant) return null;

  return {
    identifiant,
    ...pick(data, geocodeFields),
    geocode: false,
  };
};

const indexifyGeocodeIds = (geocodesIds, geocodesIndices) =>
  geocodesIds.reduce(
    (result, { id, identifiant }) =>
      geocodesIndices.get(identifiant).reduce((result, dataIndex) => {
        result[dataIndex] = id;

        return result;
      }, result),
    {}
  );

const formatAndIndexGeocodes = (dataBuffer) =>
  dataBuffer
    .map(({ entity }) => {
      if (!entity) return null;

      const geocode = formatGeocode(entity);
      if (!geocode || !geocode.identifiant) return null;

      return geocode;
    })
    .filter((geocode) => geocode)
    .reduce(
      ({ geocodesMap, geocodesIndices }, geocode, index) => {
        const { identifiant } = geocode;

        geocodesMap.set(identifiant, geocode);

        const geocodeIndex = geocodesIndices.get(identifiant) || [];
        geocodeIndex.push(index);
        geocodesIndices.set(identifiant, geocodeIndex);

        return { geocodesMap, geocodesIndices };
      },
      { geocodesMap: new Map(), geocodesIndices: new Map() }
    );

const updateGeocodePois = async (geocodeId, geocode) => {
  const geocodeUpdatedFields = geocodeFields.reduce((result, field) => {
    result[`geocode_${field}`] = geocode[field];
    return result;
  }, {});

  const updateFields = {
    ...geocodeUpdatedFields,
    cartographie_geocode: geocode.id,
  };

  await knex("cartographie_pois")
    .update(updateFields)
    .where("cartographie_geocode", geocodeId);
};

const updateGeocode = async (geocode) => {
  const geocodeInBase = await knex("cartographie_geocodes")
    .where("identifiant", geocode.identifiant)
    .first();

  const geocodeId = geocode.id;

  if (geocodeId) {
    if (geocodeInBase && geocodeInBase.id !== geocodeId) {
      await knex("cartographie_geocodes").delete().where("id", geocodeId);

      Object.assign(geocodeInBase, geocode);

      geocode.id = geocodeInBase.id;
    }

    await knex("cartographie_geocodes").update(geocode).where("id", geocode.id);

    await updateGeocodePois(geocodeId, geocode);
  } else {
    await upsertAdresse(geocode);
  }
};

const formatGeocodeResult = (geocodeResult) => ({
  id: geocodeResult.id,
  identifiant: CartographieGeocode.createIdentifiant(geocodeResult),

  geocode_adresse: `${geocodeResult.result_housenumber || ""} ${
    geocodeResult.result_name || ""
  }`.trim(),

  geocode_code_postal: geocodeResult.result_postcode || "",
  geocode_commune: geocodeResult.result_city || "",

  geocode_position_longitude:
    typeof geocodeResult.longitude === "string"
      ? +geocodeResult.longitude
      : null,
  geocode_position_latitude:
    typeof geocodeResult.latitude === "string" ? +geocodeResult.latitude : null,

  // TODO: handle 'no result'
  geocode: true,
});

const geoStream = (adresses, type = "geocode", options = {}) =>
  new Promise((resolve, reject) => {
    const adressesIdentifiantsIndex = indexifyItems(adresses, "identifiant");

    let count = 0;

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
      bucketSize,
    }).on("error", reject);

    const stream = streamChain([
      async (result) => {
        const geocode = formatGeocodeResult(result);
        if (!geocode) return;

        count += 1;

        await updateGeocode(geocode);
      },
    ])
      .on("error", reject)
      .on("data", () => {})
      .on("finish", () => resolve(count));

    geocodeStream.pipe(stream);

    adresses.forEach((adresse) => geocodeStream.write(adresse));

    geocodeStream.end();
  });

const geocodeAdresses = async (adresses) => {
  const columns = ["adresse", "code_postal", "commune"];

  adresses = adresses.filter((adresse) =>
    columns
      .map((column) => {
        adresse[column] = adresse[column]
          ? // fixes geocode API 502 bad gateway error
            adresse[column].replace(/’/g, "'")
          : // fixes geocode stream trim() error
            "";

        return adresse[column];
      })
      .join()
  );

  return geoStream(adresses, "geocode", { columns });
};

const reverseGeocodeAdresses = async (adresses) =>
  geoStream(adresses, "reverse", {
    longitude: "position_longitude",
    latitude: "position_latitude",
  });

const fetchAdressesToGeocode = async () => {
  return knex("cartographie_pois")
    .select("adresse", "code_postal", "commune")
    .select(knex.raw("array_agg(id) as pois_ids"))
    .where("geocode", false)
    .andWhere((q) => {
      q.whereNotNull("adresse")
        .orWhereNotNull("code_postal")
        .orWhereNotNull("commune");
    })
    .groupBy("adresse", "code_postal", "commune")
    .limit(bucketSize);
};

const fetchAdressesToReverseGeocode = async () => {
  return knex("cartographie_pois")
    .select("position_longitude", "position_latitude")
    .select(knex.raw("array_agg(id) as pois_ids"))
    .where("geocode", false)
    .andWhere((q) => {
      q.whereNull("adresse")
        .andWhereNull("code_postal")
        .andWhereNull("commune");
    })
    .groupBy(
      "position_longitude",
      "position_latitude",
      "adresse",
      "code_postal",
      "commune"
    )
    .limit(bucketSize);
};

const processMissingGeocodes = async () => {
  const adresses = await fetchAdressesToGeocode();
  if (!adresses.length) return 0;

  return geocodeAdresses(adresses);
};

const processMissingAdresses = async () => {
  const adresses = await fetchAdressesToReverseGeocode();
  if (!adresses.length) return 0;

  return reverseGeocodeAdresses(adresses);
};

module.exports = {
  updateGeocode,
  processMissingGeocodes,
  processMissingAdresses,
};
