const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");
const Strapi = require("strapi");
const ndjson = require("ndjson");

const SEED_DIR = "seeds";

const plural = (str) => `${str}s`.replace(/ss$/, "s");

const models = [
  {
    model: "professionnel",
    dir: "annuaire-sante",
    files: ["infirmier", "sage-femme", "medecin", "pediatre"],
  },
];

let strapi;
let knex;

const seedStream = (strapiModel, { file, stream }, model) =>
  new Promise((resolve, reject) => {
    let count = 0;

    stream
      .pipe(ndjson.parse())
      .pipe(
        new Transform({
          objectMode: true,
          transform: async (seed, encoding, callback) => {
            await strapiModel.create(seed);

            count += 1;

            if (count % 100 === 0) {
              console.log(
                `inserted ${count} ${file} in ${model} model`
              );
            }

            callback();
          },
        })
      )
      .on("data", (seed) => {})
      .on("error", reject)
      .on("end", async () => {
        console.log(`finished, inserted ${count} ${file} in ${model} model`);

        resolve();
      });
  });

const importSeedStream = async ({ model, streams }) => {
  const strapiModel = strapi.query(model);

  console.log(`${model}: truncating table`);
  await strapiModel.delete();

  const modelEscaped = model.replace(/-/g, "_");

  console.log(`${model}: resetting table sequence`);
  await knex.raw(`ALTER SEQUENCE ${plural(modelEscaped)}_id_seq RESTART`);

  console.log(`${model}: streaming item(s)`);

  for (const stream of streams) {
    await seedStream(strapiModel, stream, model);
  }
};

const loadSeedsStreams = (models) =>
  models.map(({ model, dir, files }) => ({
    model,
    streams: files.map((file) => ({
      file,
      stream: fs.createReadStream(
        path.join(SEED_DIR, dir || "", `${file}.ndjson`)
      ),
    })),
  }));

const initKnex = () => (knex = strapi.connections.default);

const initStrapi = async () => {
  console.log("init strapi instance... (takes a few seconds)");
  strapi = await Strapi().load();
};

const main = async (items) => {
  if (items.length > 0) {
    items = items.filter((model) => models.indexOf(model) !== -1);

    if (items.length === 0) {
      console.log("nothing to seed, exiting");
      return;
    }
  } else {
    items = models;
  }

  console.log("seeding:", items.map((i) => i.model).join(", "));

  await initStrapi();
  initKnex();

  const seeds = loadSeedsStreams(items);

  for (const seed of seeds) await importSeedStream(seed);
};

main(process.argv.slice(2))
  .catch(console.error)
  .finally(() => {
    console.log("shutting down strapi instance");
    strapi && strapi.stop(0);
  });
