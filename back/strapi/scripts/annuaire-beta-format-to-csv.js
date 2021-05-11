const fs = require("fs");
const path = require("path");
const { AsyncParser } = require("json2csv");

const loadJsonFile = (filePath) => JSON.parse(fs.readFileSync(filePath));

const SOURCES_PATH = "./sources/annuaire-beta";
const FILE_NAME = "dataset.json";

const formatAnnuaireBeta = (feature) => {
  try {
    const { coordinates: [longitude, latitude] } = feature.geometry || { coordinates: [] };
    const { properties } = feature || {};

    return {
      longitude,
      latitude,
      ...properties,
    };
  } catch (e) {
    console.error(e, feature);
    return null;
  }
};

const main = async () => {
  console.log("geojsons loading...");

  const features = loadJsonFile(path.join(SOURCES_PATH, FILE_NAME));
  if (!features.length) return;

  const json2csv = new AsyncParser(
    {},
    { objectMode: true, transforms: [formatAnnuaireBeta] }
  );

  const writeStream = fs.createWriteStream(
    path.join(SOURCES_PATH, `${path.basename(FILE_NAME, ".json")}.csv`)
  );

  json2csv.processor.pipe(writeStream);

  let loaded = 0;

  for (const feature of features) {
    const formated = formatAnnuaireBeta(feature);
    if (!formated) continue;

    json2csv.input.push(formated);

    loaded += 1;
  }

  json2csv.input.push(null);

  writeStream.on("finish", () =>
    console.log("[annuaire beta] features, loaded:", loaded)
  );
};

main()
  .catch(console.error)
  .finally(() => {});
