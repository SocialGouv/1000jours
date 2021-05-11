const CsvService = require("../../csv/services");
const JsonService = require("../../json/services");

const getType = (filePath) => {
  if (filePath.match(/.csv$/)) return "csv";
  if (filePath.match(/\.(geo)?json$/)) return "json";
};

const fileTypeServices = {
  csv: CsvService,
  json: JsonService,
};

const processFileHeader = async (filePath) => {
  let fileType = getType(filePath);
  if (!fileType) return {};

  return fileTypeServices[fileType].parseHeader(filePath);
};

const process = async (
  filePath,
  { lineProcessor, bufferProcessor, batchSize }
) => {
  const fileType = getType(filePath);
  if (!fileType) return null;

  return streamProcessFile(filePath, [
    ...(await fileTypeServices[fileType].getProcessors(filePath)),
    (line) => lineProcessor(line, fileType),
    new Batch({ size: batchSize }),
    (dataBuffer) => bufferProcessor(dataBuffer, fileType),
  ]);
};

const getHeader = async (fichier) => {
  const filePath = path.join("public", fichier.url);

  try {
    const { columns } = await processFileHeader(filePath);
    if (columns && columns.length) return columns;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getType,
  process,
  getColumns,
};
