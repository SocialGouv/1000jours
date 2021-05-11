const { pick } = require("stream-json/filters/Pick");
const { parser: jsonStreamParser } = require("stream-json/Parser");

const StreamService = require("../../stream/services");

const getFieldsRecursive = (data, fields = new Set(), path = "") =>
  Object.keys(data).reduce((fields, key) => {
    const keyPath = path ? `${path}.${key}` : key;

    if (data[key] && Array.isArray(data[key])) {
      fields.add(`${keyPath}[]`);
    } else if (data[key] && typeof data[key] === "object") {
      getFieldsRecursive(data[key], fields, keyPath);
    } else {
      fields.add(keyPath);
    }

    return fields;
  }, fields);

const getProcessors = async (filePath) => [
  jsonStreamParser(),
  // TODO: gérer si le fichier .json n'est pas un tableau
  ...(filePath.match(/geojson/) ? [pick({ filter: "features" })] : []),
  streamArray(),
  ({ value }) => value,
];

const parseHeader = async (filePath) => {
  const columnsSet = new Set();

  await StreamService.streamProcessFile(filePath, [
    ...(await getProcessors(filePath)),
    (line) => getFieldsRecursive(line, columnsSet),
  ]);

  return { columns: [...columnsSet].sort() };
};

module.exports = { parseHeader, getProcesors };
