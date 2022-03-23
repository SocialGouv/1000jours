const { pick: streamPick } = require("stream-json/filters/Pick");
const { streamArray } = require("stream-json/streamers/StreamArray");
const { parser: jsonStreamParser } = require("stream-json/Parser");

const StreamService = require("../../stream/services");

const accumulateFieldsRecursive = (data, fields = new Set(), path = "") =>
  Object.keys(data).reduce((allFields, key) => {
    const keyPath = path ? `${path}.${key}` : key;

    if (data[key] && Array.isArray(data[key])) {
      allFields.add(`${keyPath}[]`);
    } else if (data[key] && typeof data[key] === "object") {
      accumulateFieldsRecursive(data[key], allFields, keyPath);
    } else {
      allFields.add(keyPath);
    }

    return allFields;
  }, fields);

const getProcessors = (filePath) => [
  jsonStreamParser(),
  // TODO: gérer si le fichier .json n'est pas un tableau
  ...(filePath.match(/geojson/) ? [streamPick({ filter: "features" })] : []),
  streamArray(),
  ({ value }) => value,
];

const parseHeader = async (filePath) => {
  const columnsSet = new Set();

  await StreamService.streamProcessFile(filePath, [
    ...(getProcessors(filePath)),
    (line) => accumulateFieldsRecursive(line, columnsSet),
  ]);

  return { columns: [...columnsSet].sort() };
};

module.exports = { getProcessors, parseHeader };
