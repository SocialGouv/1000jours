const fs = require("fs");
const path = require("path");
const Strapi = require("strapi");

const SEED_DIR = "seeds";

const plural = (str) => `${str}s`.replace(/ss$/, "s");

const models = ["parcours", "thematique", "etape", "evenement", "article"];

let strapi;
let knex;

const importSeed = async ({ model, seeds }) => {
  const strapiModel = strapi.query(model);

  console.log(`${model}: truncating table`);
  await strapiModel.delete();

  console.log(`${model}: resetting table sequence`);
  await knex.raw(`ALTER SEQUENCE ${plural(model)}_id_seq RESTART`);

  console.log(`${model}: inserting ${seeds.length} item(s)`);
  for (const seed of seeds) await strapiModel.create(seed);
};

const loadJsonFile = (filePath) => JSON.parse(fs.readFileSync(filePath));

const loadSeeds = () =>
  models.map((model) => ({
    model,
    seeds: loadJsonFile(path.join(SEED_DIR, `${plural(model)}.json`)),
  }));

const initKnex = () => (knex = strapi.connections.default);

const initStrapi = async () => {
  console.log("init strapi instance... (takes a few seconds)");
  strapi = await Strapi().load();
};

const main = async () => {
  await initStrapi();
  initKnex();

  const seeds = loadSeeds();

  for (const seed of seeds) await importSeed(seed);
};

main()
  .catch(console.error)
  .finally(() => {
    console.log("shutting down strapi instance");
    strapi.stop(0);
  });
