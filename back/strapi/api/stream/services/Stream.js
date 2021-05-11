const fs = require("fs");
const util = require("util");
const stream = require("stream");
const { chain: streamChain } = require("stream-chain");

// borrowed from https://github.com/segmentio/batch-stream
// to fix `instanceof Transform` error of stream-chain
function Batch(options) {
  if (!(this instanceof Batch)) return new Batch(options);

  options || (options = {});

  const transformOptions = {
    objectMode: true,
  };

  if (options.highWaterMark !== undefined) {
    transformOptions.highWaterMark = options.highWaterMark;
  }

  stream.Transform.call(this, transformOptions);

  this.size = options.size || 100;
  this.batch = [];
}

util.inherits(Batch, stream.Transform);

Batch.prototype._transform = function (chunk, encoding, callback) {
  this.batch.push(chunk);

  if (this.batch.length >= this.size) {
    this.push(this.batch);
    this.batch = [];
  }

  callback();
};

Batch.prototype._flush = function (callback) {
  if (this.batch.length) {
    this.push(this.batch);
    this.batch = [];
  }

  callback();
};

const streamProcessFile = (filePath, processors) =>
  new Promise(async (resolve, reject) => {
    const stream = streamChain([fs.createReadStream(filePath), ...processors])
      .on("error", reject)
      .on("data", () => {})
      // fixes transform flush last push
      .on("finish", () => stream.resume())
      .on("end", () => resolve());
  });

module.exports = { Batch, streamProcessFile };
