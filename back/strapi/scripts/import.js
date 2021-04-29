const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const SEED_DIR = "seeds";

const API_URL =
  "http://backoffice-preprod-les1000jours.dev2.fabrique.social.gouv.fr";

const plural = (str) => `${str}s`.replace(/ss$/, "s");

const models = ["parcours", "thematique", "etape", "evenement", "article"];

const main = async () => {
  for (const model of models) {
    const modelPlural = plural(model);

    const url = new URL(`${modelPlural}?_sort=id`, API_URL).href;

    console.log(`fetching ${url}`);

    const res = await fetch(url);
    const data = await res.json();

    console.log(`fetched ${data.length} ${modelPlural}`);

    const filePath = path.join(SEED_DIR, `${modelPlural}.json`);

    console.log(`writing to ${filePath}`);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
};

main()
  .catch(console.error)
  .finally(() => {});
