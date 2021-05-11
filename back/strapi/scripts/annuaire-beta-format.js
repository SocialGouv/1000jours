const fs = require("fs");
const path = require("path");

const loadJsonFile = (filePath) => JSON.parse(fs.readFileSync(filePath));

const SOURCES_PATH = "./sources/annuaire-beta";

const types = ["pmi", "caf"];

const formatAnnuaireBeta = (feature) => {
  try {
    if (!types.includes(feature.properties.pivotLocal)) return;

    const { geometry, properties } = feature;

    const {
      coordinates: [latitude, longitude],
    } = geometry || {};

    const { pivotLocal: type, nom, adresses = [] } = properties || {};

    const adressePhysique = adresses.length
      ? adresses.find((a) => a.type === "physique") || {}
      : adresses;

    const { codePostal: code_postal, commune } = adressePhysique;

    return {
      type,
      nom,
      code_postal,
      commune,
      latitude,
      longitude,
      sources: [{ name: "annuaire-beta", data: feature }],
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

const main = async () => {
  console.log("geojsons loading...");

  const filesNames = fs.readdirSync(SOURCES_PATH);

  const geojsons = filesNames.flatMap((fileName) => {
    console.log("geojson reading...", fileName);

    const file = loadJsonFile(path.join(SOURCES_PATH, fileName));

    return file.map(formatAnnuaireBeta).filter((e) => e);
  });

  console.log("[annuaire beta] geojsons, loaded:", geojsons.length);

  fs.writeFileSync(
    path.join("seeds", "structures.json"),
    JSON.stringify(geojsons, null, 2)
  );
};

main()
  .catch(console.error)
  .finally(() => {});
