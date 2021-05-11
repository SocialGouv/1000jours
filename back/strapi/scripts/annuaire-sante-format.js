const fs = require("fs");
const path = require("path");
const csvtojson = require("csvtojson");

const loadJsonFile = (filePath) => JSON.parse(fs.readFileSync(filePath));

const SOURCES_PATH = "./sources/annuaire-sante";

const FILE_NAME_REG = /PS_LibreAcces_Personne_activite_/;

const professions = [
  {
    type: "sage-femme",
    cond: [
      {
        key: "Libellé profession",
        val: "Sage-Femme",
      },
    ],
    count: 0,
    stream: null,
    parse: true,
  },
  {
    type: "pediatre",
    cond: [
      {
        key: "Libellé savoir-faire",
        val: "Pédiatrie",
      },
    ],
    count: 0,
    stream: null,
    parse: true,
  },
  {
    type: "infirmier",
    cond: [
      {
        key: "Libellé profession",
        val: "Infirmier",
      },
    ],
    count: 0,
    stream: null,
    parse: true,
  },
  {
    type: "medecin",
    cond: [
      {
        key: "Libellé profession",
        val: "Médecin",
      },
    ],
    count: 0,
    stream: null,
    parse: true,
  },
];

const formatProfessionnel = (professionnel, profession) => {
  const type = profession.type;
  const nom = `${professionnel["Prénom d'exercice"]} ${professionnel["Nom d'exercice"]}`;
  const code_postal = professionnel["Code postal (coord. structure)"];
  const commune = professionnel["Libellé commune (coord. structure)"];

  return {
    type,
    nom,
    code_postal,
    commune,
    sources: [{ name: "annuaire-sante", data: professionnel }],
  };
};

const filterData = (professions) => (data) =>
  professions.find(({ type, cond }) =>
    cond.every(({ key, val }) => data[key] === val)
  );

const openStreams = (professions) =>
  professions.forEach((profession) => {
    const targetPath = path.join(SOURCES_PATH, `${profession.type}.ndjson`);

    profession.stream = fs.createWriteStream(targetPath);
  });

const getFilePath = (fileNameRegExp) => {
  const filesNames = fs.readdirSync(SOURCES_PATH);

  const fileName = filesNames.find((fileName) =>
    fileName.match(fileNameRegExp)
  );
  const filePath = path.join(SOURCES_PATH, fileName);

  return filePath;
};

const main = async (professions) => {
  console.log("geojsons loading...");

  const filePath = getFilePath(FILE_NAME_REG);
  const readStream = fs.createReadStream(filePath);

  //  professions = professions.slice(-1);

  openStreams(professions);

  const findProfession = filterData(professions);

  csvtojson({ delimiter: "|", flatKeys: true })
    .fromStream(readStream)
    .on("data", (data) => {
      const json = JSON.parse(data);

      const profession = findProfession(json);
      if (!profession || !profession.parse) return;

      const professionnel = formatProfessionnel(json, profession);

      profession.count += 1;

      console.log(profession.type, profession.count);

      const str = JSON.stringify(professionnel);

      profession.stream.write(`${str}\n`);

      profession.parse = profession.count < 1000;
    });
};

main(professions)
  .catch(console.error)
  .finally(() => {});
