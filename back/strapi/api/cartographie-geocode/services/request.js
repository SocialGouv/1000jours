"use strict";

const axios = require("axios");

const FormData = require("form-data");

const { Transform: toCsv } = require("json2csv");
const toJson = require("csvtojson");

const { Batch } = require("../../stream/services");

const {
  GEOCODE_ADRESSE_FIELDS,
  GEOCODE_RESULT_FIELDS,
  formatGeocodeResultGeojson,
} = require("./format");

const GEOCODE_SERVICE_URL = "https://api-adresse.data.gouv.fr";

const BATCH_SIZE = 1000;

const geocodeRequestStream = (service, stream, fields) =>
  new Promise((resolve, reject) => {
    const opts = { fields };

    const csvStream = stream.pipe(new toCsv(opts, { objectMode: true }));

    // set to -1 to skip header
    let requestedGeocodes = -1;

    const fileStream = require("fs").createWriteStream("./geocode-request.csv");

    csvStream
      .on("data", () => (requestedGeocodes += 1))
      .pipe(fileStream)
      .on("end", () => {
        console.log(`[geocode] requested ${requestedGeocodes} geocode(s)`);
      });

    const form = new FormData();

    form.append("data", csvStream, {
      filename: "input.csv",
      contentType: "text/csv",
    });

    GEOCODE_ADRESSE_FIELDS.forEach((field) => form.append("columns", field));
    GEOCODE_RESULT_FIELDS.forEach((field) =>
      form.append("result_columns", field)
    );

    form.submit(`${GEOCODE_SERVICE_URL}/${service}`, (err, res) => {
      if (err) return reject(err);
      if (res.statusCode !== 200) {
        return reject(`Error from geocode service: ${res.statusCode}`);
      }

      const csvStreamDecode = toJson({}, { objectMode: true });

      return resolve(() => res.pipe(csvStreamDecode));
    });
  });

const geocodeRequest = async (service, params) => {
  const response = await axios(`${GEOCODE_SERVICE_URL}/${service}`, {
    params: {
      ...params,
      limit: 1,
    },
  });

  const { data: result } = response || {};

  // if result features are empty, then geocode failed
  // setting geocode to `true` anyway
  // problematic addresses will be processed manually
  return result && result.features && result.features.length
    ? formatGeocodeResultGeojson(result.features[0])
    : { geocode: true };
};

module.exports = { geocodeRequest, geocodeRequestStream };
