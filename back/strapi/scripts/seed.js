const fs = require("fs");
const path = require("path");
const Strapi = require("strapi");

const SEED_DIR = "seeds";

const plural = (str) => `${str}s`.replace(/ss$/, "s");

const models = [
  "parcours",
  "thematique",
  "etape",
  "evenement",
  "article",
  "questionnaire-epds",
  "questionnaire-epds-traductions",
  "cartographie-types",
  "locale",
  "labels-epds-traductions",
  "parentheque-documents",
  "widget-epds-sources",
];

let strapi;
let knex;

const importSeed = async ({ model, seeds }) => {
  const strapiModel = strapi.query(model);

  console.log(`${model}: truncating table`);
  await strapiModel.delete();

  const modelEscaped = model.replace(/-/g, "_");

  console.log(`${model}: resetting table sequence`);
  await knex.raw(`ALTER SEQUENCE ${plural(modelEscaped)}_id_seq RESTART`);

  console.log(`${model}: inserting ${seeds.length} item(s)`);
  for (const seed of seeds) await strapiModel.create(seed);
};

const loadJsonFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (e) {
    return [];
  }
};

const loadSeeds = (models) =>
  models.map((model) => ({
    model,
    seeds: loadJsonFile(path.join(SEED_DIR, `${plural(model)}.json`)),
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

  console.log("seeding:", items.join(", "));

  await initStrapi();
  initKnex();

  const seeds = loadSeeds(items);

  for (const seed of seeds) await importSeed(seed);
};

main(process.argv.slice(2))
  .catch(console.error)
  .finally(() => {
    console.log("shutting down strapi instance");
    strapi && strapi.stop(0);
  });
