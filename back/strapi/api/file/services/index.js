const StreamService = require("../../stream/services");
const CsvService = require("../../csv/services");
const JsonService = require("../../json/services");

const getType = (filePath) => {
  if (filePath.match(/.csv$/)) return "csv";
  if (filePath.match(/\.(geo)?json$/)) return "json";
};

const services = {
  csv: CsvService,
  json: JsonService,
};

const process = async (
  filePath,
  { lineProcessor, bufferProcessor, batchSize }
) => {
  const fileType = getType(filePath);
  if (!fileType) return null;

  const processors = [];

  if (lineProcessor) {
    processors.push((line) => lineProcessor(line, fileType));
  }

  if (bufferProcessor) {
    processors.push(
      new StreamService.Batch({ size: batchSize }),
      (dataBuffer) => bufferProcessor(dataBuffer, fileType)
    );
  }

  if (!processors.length) return null;

  return StreamService.streamProcessFile(filePath, [
    ...(await services[fileType].getProcessors(filePath)),
    ...processors,
  ]);
};

const processHeader = async (filePath) => {
  let fileType = getType(filePath);
  if (!fileType) return {};

  return services[fileType].parseHeader(filePath);
};

const getColumns = async (filePath) => {
  try {
    const { columns } = await processHeader(filePath);
    if (columns && columns.length) return columns;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getType,
  getColumns,
  process,
};
