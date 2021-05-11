const { chain } = require("stream-chain");
const { parser } = require("stream-json/Parser");
const { pick } = require("stream-json/filters/Pick");
const { filter } = require("stream-json/filters/Filter");
const { streamArray } = require("stream-json/streamers/StreamArray");
const { streamObject } = require("stream-json/streamers/StreamObject");
const { streamValues } = require("stream-json/streamers/StreamValues");
const { Readable, Writable, Duplex, Transform } = require("stream");

const BatchStream = require("batch-stream");

const batch = new BatchStream()

console.log(batch instanceof BatchStream);
console.log(batch instanceof Transform);
console.log(batch instanceof Object);

process.exit(0);

const fs = require("fs");

const filePath =
  process.argv[2] ||
  "sources/umap-maternites/umap_maternites_en_france.geojson";

const pipeline = chain([
  fs.createReadStream(filePath),
  parser(),
  ...(filePath.match(/geojson/)
    ? [pick({ filter: "features" }), streamArray()]
    : [streamArray()]),
]);

let objectCounter = 0;
pipeline.on("data", (data) => {
  ++objectCounter;

  console.log(data);
});
pipeline.on("end", () => console.log(`Found ${objectCounter} objects.`));
