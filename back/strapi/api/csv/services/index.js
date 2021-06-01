const fs = require("fs");
const csvtojson = require("csvtojson");
const { detect: detectDelimiter } = require("csv-string");

const detectColumns = (string, options) =>
  new Promise((resolve, reject) => {
    const stream = csvtojson(options)
      .on("error", reject)
      .on("header", (columns) => {
        if (!columns || !columns.length)
          return reject(new Error("impossible error: no header"));

        resolve(columns);
      })
      .write(`${string}\n`);
  });

const readFirstLine = async (filePath) =>
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
      .on("close", () => resolve(line.slice(0, pos + index)))
      .on("error", reject);
  });

const parseHeader = async (filePath, options = {}) => {
  const line = await readFirstLine(filePath);

  const delimiter = detectDelimiter(line);

  const columns = await detectColumns(line, { ...options, delimiter });
  if (!columns.length) throw new Error(`${filePath} no columns, abort`);

  return { delimiter, columns };
};

const getProcessors = async (filePath) => {
  const { delimiter } = await parseHeader(filePath);

  return [csvtojson({ delimiter, flatKeys: true }, { objectMode: true })];
};

module.exports = { parseHeader, getProcessors };
