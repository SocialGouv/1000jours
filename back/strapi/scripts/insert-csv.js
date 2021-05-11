require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csvtojson = require("csvtojson");
const { Client } = require("pg");

const dbConnect = async () => {
  const dbClient = new Client({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });

  await dbClient.connect();

  return dbClient;
};

const getFilePath = (sourceDir, fileNameRegExp) => {
  const filesNames = fs.readdirSync(sourceDir);

  const fileName = filesNames.find((fileName) =>
    fileName.match(fileNameRegExp)
  );
  if (!fileName) return null;

  const filePath = path.join(sourceDir, fileName);

  return filePath;
};

const sqlInsertFormatValuesAsArray = (values) =>
  values.map((v) => `'${v.replace(/'/g, "''")}'`).join(", ");

const sqlInsertFormatValuesAsString = (values) =>
  values.slice(1, values.length - 2);

const sqlInsertFormatValues = (values) =>
  `(${
    typeof values === "string"
      ? sqlInsertFormatValuesAsString(values)
      : sqlInsertFormatValuesAsArray(values)
  })`;

const sqlInsertValues = (tableName, values) => `
  INSERT INTO ${tableName}
  VALUES ${sqlInsertFormatValues(values)};
`;

const sqlInsertFormatValuesArray = (valuesArray) =>
  valuesArray.map(sqlInsertFormatValues).join(",\n    ");

const sqlInsertValuesArray = (tableName, valuesArray) => `
  INSERT INTO ${tableName}
  VALUES
    ${sqlInsertFormatValuesArray(valuesArray)};
`;

const sqlCreateFormatColumns = (columns) =>
  columns.map((c, i) => `"${c || "field" + i}" text`).join(",\n    ");

const sqlCreateTable = (tableName, columns) => `
  DROP TABLE IF EXISTS import_${tableName};

  CREATE TABLE import_${tableName} (
    ${sqlCreateFormatColumns(columns)}
  );
`;

const csvProcess = (tableName, csvStream, dbClient) =>
  new Promise((resolve, reject) => {
    console.log("processing csv data...");

    const state = {
      created: false,
      finished: false,
      header: null,
      buffer: [],
    };

    csvStream
      .on("error", reject)
      .on("finish", (error) => {
        console.log(
          "finish event",
          state.buffer.length,
          "items",
          ", error:",
          !!error
        );

        if (state.buffer.length) {
        }

        error ? reject(error) : resolve();
      })
      .on("header", async (header) => {
        console.log('header:', header)

        state.header = header;

        if (false)
        csvStream.on('data', (data) => {
          console.log('data')
        })
      });
  });

let dbClient;

const run = async () => {
  console.log("csv loading...");

  const SOURCES_PATH = "./sources/annuaire-sante";

  const FILE_NAME_REG = /PS_LibreAcces_Personne_activite_/;

  const tableName = "import_annuaire_sante";
  const delimiter = "|";

  const filePath = getFilePath(SOURCES_PATH, FILE_NAME_REG);
  if (!filePath) return;

  console.log("found csv:", filePath);

  dbClient = await dbConnect();

  const csvStream = csvtojson({
    delimiter,
    flatKeys: true,
    output: "csv",
  });

  csvStream.fromStream(fs.createReadStream(filePath));

  await csvProcess(tableName, csvStream, dbClient);

  console.log("finished processing csv");
};

const main = () =>
  run()
    .catch(console.error)
    .finally(() => {
      dbClient && dbClient.end();
    });

main();
