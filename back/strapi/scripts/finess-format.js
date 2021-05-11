const fs = require("fs");
const path = require("path");
const csvtojson = require("csvtojson");

const loadJsonFile = (filePath) => JSON.parse(fs.readFileSync(filePath));

const SOURCES_PATH = "./sources/finess";
const FILE_PATH = "finess-clean.csv";

const formatStructure = (structure) => {
  const type = structure.type;
  const nom = structure.rslongue;

  const [, code_postal, ...communeParts] = structure.ligneacheminement.match(/^(.{5}) (.+)/);

  const commune = communeParts.join(' ')

  return {
    type,
    nom,
    code_postal,
    commune,
    sources: [{ name: "finess", data: structure }],
  };
};

const main = async () => {
  console.log("csv loading...");

  const filePath = path.join(SOURCES_PATH, FILE_PATH);
  const readStream = fs.createReadStream(filePath);

  const targetPath = path.join(SOURCES_PATH, 'finess.ndjson');
  const writeStream = fs.createWriteStream(targetPath);

  let i = 0;

  csvtojson({ delimiter: ";", flatKeys: true })
    .fromStream(readStream)
    .on("data", (data) => {
      i += 1;

      const structure = formatStructure(JSON.parse(data))

      writeStream.write(`${JSON.stringify(structure)}\n`);
    });
};

main()
  .catch(console.error)
  .finally(() => {});
