require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csvtojson = require("csvtojson");
const { Pool, Query } = require("pg");
const { detect: detectDelimiter } = require("csv-string");
const copyFrom = require("pg-copy-streams").from;

let dbClient;

const getFilePath = (sourceDir, fileNameRegExp) => {
  const filesNames = fs.readdirSync(sourceDir);

  const fileName = filesNames.find((fileName) =>
    fileName.match(fileNameRegExp)
  );
  if (!fileName) return null;

  const filePath = path.join(sourceDir, fileName);

  return filePath;
};

const sqlCreateTableFormatColumns = (columns) =>
  columns
    .map((c, i) => {
      const type = "text";

      return `"${c || "field" + i}" ${type}`;
    })
    .join(",\n    ");

const sqlCreateTable = (tableName, columns) => `
  DROP TABLE IF EXISTS import_${tableName};

  CREATE TABLE import_${tableName} (
    ${sqlCreateTableFormatColumns(columns)}
  );
`;

const sqlCopyCsv = (tableName, delimiter) => `
  COPY import_${tableName}
  FROM STDIN
  DELIMITER '${delimiter}'
  CSV HEADER;
`;

const csvStreamToDb = ({ tableName, dbClient, readStream, delimiter }) =>
  new Promise(async (resolve, reject) => {
    console.log(`[${tableName}] streaming to db`);

    const query = copyFrom(sqlCopyCsv(tableName, delimiter));
    const stream = dbClient.query(query);

    stream.on("error", reject).on("finish", resolve);

    readStream.on("error", reject).pipe(query);
  });

const csvDetectColumns = (string, options) =>
  new Promise((resolve, reject) => {
    const stream = csvtojson(options)
      .on("error", reject)
      .on("header", (columns) => {
        stream.end();

        if (!columns || !columns.length)
          return reject(new Error("impossible error: no header"));

        resolve(columns);
      });
    stream.write(string);
  });

const csvReadFirstLine = async (filePath) =>
  new Promise((resolve, reject) => {
    let line = "";
    let pos = 0;
    let index = 0;

    const stream = fs
      .createReadStream(filePath)
      .on("data", (data) => {
        index = data.indexOf("\n");

        line += data.toString();

        index !== -1 ? stream.close() : (pos += data.length);
      })
      .on("close", () => {
        resolve(line.slice(0, pos + index));
      })
      .on("error", reject);
  });

const csvDelimiterDetect = async (filePath, options = {}) => {
  const line = await csvReadFirstLine(filePath);

  const delimiter = detectDelimiter(line);

  const columns = await csvDetectColumns(line, {
    ...options,
    delimiter,
  });

  if (!columns.length) {
    return reject(new Error(`${filePath} no columns, abort`));
  }

  return { delimiter, columns }
};

const csvProcess = async (dbClient, filePath, tableName) => {
  const { delimiter, columns } = await csvDelimiterDetect(filePath);

  console.log(
    `[${tableName}] finished processing ${filePath}, delimiter = "${delimiter}"`
  );
  console.log(`[${tableName}] columns = ${columns.join(", ")}`);

  console.log(`[${tableName}] drop / creating table`);
  await dbClient.query(sqlCreateTable(tableName, columns));

  const readStream = fs.createReadStream(filePath);

  await csvStreamToDb({ tableName, dbClient, readStream, delimiter });
};

const jsonLoad = (filePath) => JSON.parse(fs.readFileSync(filePath));

const sqlInsertFormatValues = (columns, obj) =>
  columns
    .map((column) => {
      let value = obj[column];

      if (typeof value === "object") value = JSON.stringify(value);
      if (value === undefined) value = "";

      return typeof value === "string"
        ? `'${value.replace(/'/g, "''")}'`
        : value;
    })
    .join(", ");

const sqlInsertFormatValuesArray = (columns, valuesArray) =>
  valuesArray
    .map((arr) => `(${sqlInsertFormatValues(columns, arr)})`)
    .join(",\n    ");

const sqlInsertValuesArray = (tableName, columns, valuesArray) => `
  INSERT INTO import_${tableName}
  VALUES
    ${sqlInsertFormatValuesArray(columns, valuesArray)};
`;

const jsonColumnsProcess = (dataArray) =>
  Object.keys(
    dataArray.reduce(
      (columns, obj) =>
        Object.keys(obj).reduce((columns, key) => {
          columns[key] = true;
          return columns;
        }, columns),
      {}
    )
  );

const jsonInsert = async (dbClient, tableName, dataArray) => {
  console.log(`[${tableName}] drop / creating table`);

  console.log(dataArray.length);

  const columns = jsonColumnsProcess(dataArray);
  console.log([...columns]);

  const sqlCreate = sqlCreateTable(tableName, columns);

  await dbClient.query(sqlCreate);

  const sql = sqlInsertValuesArray(tableName, columns, dataArray);

  console.log(sql);

  await dbClient.query(sql);
};

const geojsonFormatFeature = ({
  geometry: { coordinates } = { coordinates: [] },
  properties = {},
}) => ({
  ...properties,
  coordinates: coordinates || [],
});

const batchSize = 1000;

const geojsonFeaturesProcess = async (dbClient, tableName, features) => {
  const featuresBuffer = [];

  console.log(tableName, "features:", features.length);

  for (const feature of features) {
    featuresBuffer.push(geojsonFormatFeature(feature));

    if (featuresBuffer.length >= batchSize) {
      console.log(featuresBuffer);

      await jsonInsert(dbClient, tableName, featuresBuffer);

      featuresBuffer.length = 0;
    }
  }

  if (featuresBuffer.length) {
    await jsonInsert(dbClient, tableName, featuresBuffer);
  }
};

const geojsonProcess = async (dbClient, filePath, tableName) => {
  const geojson = jsonLoad(filePath);

  const features =
    geojson.type === "FeatureCollection" ? geojson.features : geojson;

  await geojsonFeaturesProcess(dbClient, tableName, features);
};

const jsonProcess = async (dbClient, filePath, tableName) => {
  const json = jsonLoad(filePath);

  const obj = Array.isArray(json) ? json[0] : json;

  if (obj.type === "Feature") {
    return await geojsonFeaturesProcess(dbClient, tableName, json);
  }

  const columns = Object.keys(obj);

  console.log("json col", columns);
};

const fileProcess = async (dbClient, filePath) => {
  const tableName = filePath.split("/")[1].replace(/-/, "_");
  const extension = path.extname(filePath);

  console.log(`[${tableName}] ${extension} loading...`, filePath);

  if (extension === ".geojson") {
    await geojsonProcess(dbClient, filePath, tableName);
  } else if (extension === ".json") {
    await jsonProcess(dbClient, filePath, tableName);
  } else {
    await csvProcess(dbClient, filePath, tableName);
  }
};

const main = async () => {
  if (process.argv.length < 3)
    return console.log("usage: node auto-insert FILE [FILE2 FILE3]");

  let dbClient;

  try {
    const filePath = process.argv[2];

    const pool = new Pool({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    });

    dbClient = await pool.connect();

    for (const filePath of process.argv.slice(2)) {
      await fileProcess(dbClient, filePath);
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (dbClient) {
      dbClient.end();
    }
  }
};

main();
